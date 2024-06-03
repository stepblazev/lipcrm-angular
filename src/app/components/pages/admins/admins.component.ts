import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminModel } from 'src/app/modules/admins/models/admin';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { AdminsNewComponent } from './admins-new/admins-new.component';
import { PopupComponent } from '../../ui/popup/popup.component';
import { faCircleUser, faTrashCan, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminService } from 'src/app/modules/admins/admin.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../ui/pagination/pagination.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    PopupComponent,
    AdminsNewComponent,
    FontAwesomeModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent implements OnInit {
  constructor(
    public readonly adminService: AdminService,
    private readonly confirm: ConfirmService
  ) {}

  ngOnInit(): void {
    this.adminService.fetchAdmins({ page: 1});
  }

  public resetFilter(): void {
    this.adminService.filter.search = '';
    this.adminService.applyFilter();
  }
  
  public deleteAdmin(admin: AdminModel): void {
    this.confirm
      .confirm({
        title: 'Удалить?',
        message: 'Вы действительно хотите удалить админа без возможности восстановления?<br><br> Вместе с админом будет  <b>удалена организация со всеми ее данными</b>!',
        confirm: 'Да',
        cancel: 'Нет',
        delay: 2000,
      })
      .subscribe((answer) => {
        if (answer) {
          this.adminService.delete(admin);
          this.adminService.fetchAdmins();
        }
      });
  }

  public adminIcon = faCircleUser;
  public resetIcon = faXmark;
  public createIcon = faPlus;
  public deleteIcon = faTrashCan;
}
