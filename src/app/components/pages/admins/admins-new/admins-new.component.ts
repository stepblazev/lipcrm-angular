import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObservableInput, catchError } from 'rxjs';
import { ImageUploadComponent } from 'src/app/components/ui/image-upload/image-upload.component';
import { AdminService } from 'src/app/modules/admins/admin.service';
import { ICreateAdminPayloadDTO, ICreateAdminResponseDTO } from 'src/app/modules/admins/dto/create.dto';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { matchPasswords } from 'src/app/shared/validators/match-passwords';
import { AUTH_CONFIG } from 'src/constants';

@Component({
  selector: 'app-admins-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ImageUploadComponent],
  templateUrl: './admins-new.component.html',
  styleUrl: './admins-new.component.scss',
})
export class AdminsNewComponent implements OnInit {
  public passwordMinLength: number = AUTH_CONFIG.PASSWORD.MIN_LENGTH;

  public form: FormGroup | undefined;

  constructor(
    private readonly gloader: GloaderService,
    private readonly formBuilder: FormBuilder,
    private readonly adminService: AdminService,
    private readonly adminRepository: AdminRepository
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      image: [null],
      fio: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      company_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(255)]],
      password_repeat: ['', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(255)]]
    }, { validators: matchPasswords });
  }

  public create(event: Event): void {
    event.preventDefault();
    
    if (this.form?.invalid) {
        this.form.markAllAsTouched();
        return;
    }
    
    this.gloader.isLoading = true;
    this.form?.disable();
    
    const payload: ICreateAdminPayloadDTO = this.form?.value;
    if (payload.image === null) payload.image = undefined;

    this.adminRepository.create(payload)
      .pipe(
        catchError<ICreateAdminResponseDTO, ObservableInput<ICreateAdminResponseDTO>>(
          (selector) => {
            this.form?.enable();
            return selector;
          }
        )
      )
      .subscribe((response) => {
        if (response.success) {
          this.form?.enable();
          this.form?.reset();
          this.adminService.closeNew();
          this.adminService.fetchAdmins({ page: 1 });
        }
      });
  }
  
  public reset(): void {
    this.form?.reset();
    this.adminService.closeNew();
  }

  public closePopup(): void {
    this.form?.reset();
    this.adminService.closeNew();
  }

  public onImageChange(file: File | null): void {
    this.form?.get('image')?.setValue(file);
  }
}
