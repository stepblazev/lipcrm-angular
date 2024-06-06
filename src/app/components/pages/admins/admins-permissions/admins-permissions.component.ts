import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IOption, SelectComponent } from 'src/app/components/ui/select/select.component';
import { PermissionRepository } from 'src/app/modules/admins/repositories/permission.repository';
import { IPermissionProps } from 'src/app/modules/user/models/company';
import { GloaderService } from 'src/app/shared/services/gloader.service';

@Component({
  selector: 'app-admins-permissions',
  standalone: true,
  imports: [CommonModule, SelectComponent],
  templateUrl: './admins-permissions.component.html',
  styleUrl: './admins-permissions.component.scss'
})
export class AdminsPermissionsComponent implements OnInit {
    public currentPermission: IOption<IPermissionProps>;
    public permissions: IOption<IPermissionProps>[] = [];
    
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
}
