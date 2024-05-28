import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ObservableInput, catchError, delay, interval } from 'rxjs';
import { IAdminsResponseDTO } from 'src/app/modules/admins/dto/admins.dto';
import { AdminModel } from 'src/app/modules/admins/models/admin';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { CheckboxComponent } from '../../ui/checkbox/checkbox.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss',
})
export class AdminsComponent implements OnInit {
  public admins: AdminModel[] = [];

  constructor(
    private readonly gloader: GloaderService,
    private readonly toastr: ToastrService,
    private readonly adminRepository: AdminRepository
  ) {}

  public ngOnInit(): void {
    this.gloader.isLoading = true;

    this.adminRepository.admins()
      .pipe(
        catchError<IAdminsResponseDTO, ObservableInput<IAdminsResponseDTO>>(
          (selector) => {
            // в случае ошибки выводим уведомление (сообщение приходит от сервера)
            const response = selector.error as IAdminsResponseDTO;
            this.toastr.error(response.error?.message);

            // выключаем глобальный лоадер
            this.gloader.isLoading = false;

            return selector;
          }
        )
      )
      .subscribe((response) => {
        this.gloader.isLoading = false;
        if (response.success) {
          this.admins = response.data.map(
            (adminProps) => new AdminModel(adminProps)
          );
        }
      });
  }
}
