import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MultiSelectComponent } from 'src/app/components/ui/multi-select/multi-select.component';
import { PopupComponent } from 'src/app/components/ui/popup/popup.component';
import { IOption, SelectComponent } from 'src/app/components/ui/select/select.component';
import { PermissionRepository } from 'src/app/modules/admins/repositories/permission.repository';
import { IPermissionProps } from 'src/app/modules/user/models/company';

@Component({
  selector: 'app-admins-permissions',
  standalone: true,
  imports: [CommonModule, SelectComponent, MultiSelectComponent, PopupComponent, FontAwesomeModule],
  templateUrl: './admins-permissions.component.html',
})
export class AdminsPermissionsComponent implements OnInit {
    @Input() currentPermissions: IPermissionProps[] = [];   
    @Output() permissionsChanged = new EventEmitter<IPermissionProps[]>();
    
    public currents: IOption<IPermissionProps>[] = [];   
    public options: IOption<IPermissionProps>[] = [];
    
    public isLoading: boolean = false;
    public showDescription: boolean = false;
    
    constructor(private readonly permissionRepository: PermissionRepository) {}
    
    ngOnInit(): void {
        this.isLoading = true;
        
        // получаем список всех допусков от сервера
        this.permissionRepository.permissions().subscribe(response => {
            if (response.success) {
                this.options = response.data.map(permission => ({
                    value: permission,
                    caption: permission.display_name,
                }));
                
                const ids = this.currentPermissions.map(e => e.id);
                this.currents = this.options.filter(option => ids.includes(option.value.id))
            }
            
            this.isLoading = false;
        })
    }   
    
    public updatePermission(options: IOption<IPermissionProps>[]): void {
        this.currents = options;
        this.permissionsChanged.emit(options.map(option => option.value));
    }
    
    closeIcon = faXmark;
    descriptionIcon = faCircleQuestion;
}
