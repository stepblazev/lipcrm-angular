import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { URLParamsService } from 'src/app/shared/services/url-params.service';
import { IAdminsPayloadDTO } from 'src/app/modules/admins/dto/admins.dto';
import { RouterLink } from '@angular/router';

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
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent implements OnInit, OnDestroy {
  constructor(
    public readonly adminService: AdminService,
    private readonly URLParams: URLParamsService,
    private readonly confirm: ConfirmService
  ) {}

  ngOnInit(): void {
    // получаем все параметры из URL
    const params = this.URLParams.getAllParams();
    const payload: Omit<IAdminsPayloadDTO, 'per_page'> = {
        page: 1,
        search: '',
        order_column: undefined,
        order_by: undefined,
    };

    // если параметр URL есть в payload, вставляем значение
    for (let key in params) {
        if (key in payload) {
            (payload as any)[key] = params[key];
        }
    }
    
    this.adminService.fetchAdmins(payload);
  }
  
  ngOnDestroy(): void {
    this.adminService.resetContext();
  }

  public resetFilter(): void {
    this.adminService.filter.search = '';
    this.adminService.applyFilter();
  }
  
  public deleteAdmin(admin: AdminModel): void {
    this.confirm
      .confirm({
        title: 'Удаление админа',
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
