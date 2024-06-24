import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PopupComponent } from 'src/app/components/ui/popup/popup.component';
import { IOption, SelectComponent } from 'src/app/components/ui/select/select.component';
import { PermissionRepository } from 'src/app/modules/admins/repositories/permission.repository';
import { IPermissionProps } from 'src/app/modules/user/models/company';

@Component({
  selector: 'app-admins-permissions',
  standalone: true,
  imports: [CommonModule, SelectComponent, PopupComponent, FontAwesomeModule],
  templateUrl: './admins-permissions.component.html',
})
export class AdminsPermissionsComponent implements OnInit {
    public currentPermission: IOption<IPermissionProps>;
    public permissions: IOption<IPermissionProps>[] = [];
    
    public showDescription: boolean = false;
    
    constructor(private readonly permissionRepository: PermissionRepository) {}
    
    ngOnInit(): void {
        this.permissionRepository.permissions().subscribe(response => {
            if (response.success) {
                this.permissions = response.data.map(permission => ({
                    value: permission,
                    caption: permission.display_name,
                }));
            }
        })
    }   
    
    public closeIcon = faXmark;
    public descriptionIcon = faCircleQuestion;
}
