import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminModel } from 'src/app/modules/admins/models/admin';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { AdminsNewComponent } from './admins-new/admins-new.component';
import { PopupComponent } from '../../ui/popup/popup.component';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from 'src/app/modules/admins/admin.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    PopupComponent,
    AdminsNewComponent,
    FontAwesomeModule,
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent implements OnInit {
  public admins: AdminModel[] = [];
  public isNewOpened: boolean = false;

  constructor(
    public readonly adminService: AdminService,
    private readonly confirm: ConfirmService,
    private readonly gloader: GloaderService,
    private readonly adminRepository: AdminRepository
  ) {}

  public ngOnInit(): void {
    this.gloader.enable();
    this.adminRepository.admins().subscribe((response) => {
      this.gloader.disable();
      if (response.success) {
        this.admins = response.data.map(
          (adminProps) => new AdminModel(adminProps)
        );
      }
    });
  }

  public closePopup(): void {
    this.isNewOpened = false;

    this.adminRepository.admins().subscribe((response) => {
      if (response.success) {
        this.admins = response.data.map(
          (adminProps) => new AdminModel(adminProps)
        );
      }
    });
  }

  public deleteAdmin(admin: AdminModel): void {
    this.confirm
      .confirm({
        title: 'Удалить?',
        message: 'Вы действительно хотите удалить админа без возможности восстановления?<br><br> Вместе с админом будет  <b>удалена организация со всеми ее данными</b>!',
        confirm: 'Да',
        cancel: 'Нет',
        delay: 3000
      })
      .subscribe((answer) => {
        if (answer) {
          this.adminService.delete(admin);
        }
      });
  }

  public deleteIcon = faTrashCan;
}
