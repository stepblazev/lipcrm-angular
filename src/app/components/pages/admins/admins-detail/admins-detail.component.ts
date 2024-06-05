import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ObservableInput, catchError, map } from 'rxjs';
import { CheckboxComponent } from 'src/app/components/ui/checkbox/checkbox.component';
import { ImageUploadComponent } from 'src/app/components/ui/image-upload/image-upload.component';
import { AdminService } from 'src/app/modules/admins/admin.service';
import { IUpdateAdminPayloadDTO, IUpdateAdminResponseDTO } from 'src/app/modules/admins/dto/update.dto';
import { AdminModel } from 'src/app/modules/admins/models/admin';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { urlToImage } from 'src/app/shared/utils/url-to-image';
import { matchPasswords } from 'src/app/shared/validators/match-passwords';
import { AUTH_CONFIG } from 'src/constants';

@Component({
  selector: 'app-admins-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, ImageUploadComponent, CheckboxComponent],
  templateUrl: './admins-detail.component.html',
  styleUrl: './admins-detail.component.scss',
})
export class AdminsDetailComponent implements OnInit {
  public passwordMinLength = AUTH_CONFIG.PASSWORD.MIN_LENGTH;

  public admin: AdminModel;
  public profile: FormGroup;

  constructor(
    public readonly adminService: AdminService,
    private readonly adminRepository: AdminRepository,
    private readonly title: Title,
    private readonly imageService: ImageService,
    private readonly gloader: GloaderService,
    private readonly fb: FormBuilder,
    private readonly confirm: ConfirmService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
        .pipe(map((data) => data['admin'] as AdminModel))
        .subscribe((admin) => {
            this.admin = admin;
            this.title.setTitle(`${admin.name} (${admin.email})`);
            
            this.initForm();
            this.initAvatar();
        });
  }

  public initForm(): void {
    this.profile = this.fb.group({
        image: [null],
        fio: [this.admin.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        company_name: [this.admin.company.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        phone: [this.admin.phone, [Validators.minLength(7), Validators.maxLength(50)]],
        email: [this.admin.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['', [Validators.minLength(this.passwordMinLength), Validators.maxLength(255)]],
        password_repeat: ['', [Validators.minLength(this.passwordMinLength), Validators.maxLength(255)]]
    }, { validators: matchPasswords });
  }
  
  public initAvatar(): void {
    // если у пользователя есть аватарка, получаем ее по HTTP и вносим в форму
    if (this.admin.avatar) {
        this.imageService.urlToFile(this.admin.getAvatarUrl()).subscribe(file => {
            this.profile.get('image')?.setValue(file);
        });
    }
  }
  
  public update(event: Event): void {
    event.preventDefault();  
    
    if (this.profile.invalid) {
        this.profile.markAllAsTouched();
        return;
    }
    
    this.gloader.isLoading = true;
    this.profile?.disable();
    
    const payload: IUpdateAdminPayloadDTO =  { 
        id: this.admin.id, 
        image: this.profile.get('image')?.value, // image передаем всегда (если не передать, аватар будет удален у пользователя)
        ...this.getChanged() 
    };

    this.adminRepository.update(payload)
      .pipe(
        catchError<IUpdateAdminResponseDTO, ObservableInput<IUpdateAdminResponseDTO>>(
          (selector) => {
            this.profile.enable();
            return selector;
          }
        )
      )
      .subscribe((response) => {
          if (response.success) {
            this.profile.enable();
            this.admin = new AdminModel(response.data);
            this.initForm();
            this.initAvatar();
            this.gloader.disable();
            this.toastr.success('Данные обновлены!');
        }
      });
  }
  
  public getChanged(): Partial<IUpdateAdminPayloadDTO> {
    const changed: Partial<IUpdateAdminPayloadDTO> = {};
    const formValues = this.profile.value;
    
    if (formValues.fio !== this.admin.name) {
        changed.fio = formValues.fio;
    }
    if (formValues.phone !== this.admin.phone) {
        changed.phone = formValues.phone;
    }
    if (formValues.email !== this.admin.email) {
        changed.email = formValues.email;
    }
    if (formValues.company_name !== this.admin.company.name) {
        changed.company_name = formValues.company_name;
    }
    if (formValues.password) {
        changed.password = formValues.password;
    }
    
    return changed;
  }
  
  public onImageChange(file: File | null): void {
    this.profile.get('image')?.markAsTouched();
    this.profile.get('image')?.setValue(file);
  }
  
  public backToList(): void {
    if (Object.keys(this.getChanged()).length) {
      this.confirm.confirm({
          title: 'У вас есть несохраненные изменения',
          message: 'Вы действительно хотите вернуться к списку админов? Все несохраненные изменения <b>будут удалены!</b>',
          confirm: 'Да',
          cancel: 'Нет',
        })
        .subscribe((answer) => {
          if (answer) {
            this.router.navigate(['/admins']);
          }
        });
    } else {
        this.router.navigate(['/admins']);
    }
  }

  public backIcon = faArrowLeftLong;
}
