import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminModel } from 'src/app/modules/admins/models/admin';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';
import { AdminsNewComponent } from './admins-new/admins-new.component';
import { PopupComponent } from '../../ui/popup/popup.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, PopupComponent, AdminsNewComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent implements OnInit {
  public admins: AdminModel[] = [];
  public isNewOpened: boolean = false;

  constructor(
    private readonly gloader: GloaderService,
    private readonly adminRepository: AdminRepository
  ) {}

  public ngOnInit(): void {
    this.gloader.isLoading = true;

    this.adminRepository.admins().subscribe((response) => {
        this.gloader.isLoading = false;
        if (response.success) {
          this.admins = response.data.map((adminProps) => new AdminModel(adminProps));
        }
      });
  }
}
