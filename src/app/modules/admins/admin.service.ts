import { Injectable } from '@angular/core';
import { AdminRepository } from './repositories/admin.repository';
import { AdminModel } from './models/admin';
import { ObservableInput, catchError, delay } from 'rxjs';
import { IUpdateAdminResponseDTO } from './dto/update.dto';
import { GloaderService } from 'src/app/shared/services/gloader.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private readonly gloader: GloaderService, 
    private readonly adminRepository: AdminRepository
) {}

  public setActive(admin: AdminModel, active: boolean): void {
    // запоминаем предыдущее состояние поля
    const prevActive = admin.active;
    admin.active = active;

    this.adminRepository.update({ id: admin.id, active: active })
      .pipe(
        catchError<IUpdateAdminResponseDTO, ObservableInput<IUpdateAdminResponseDTO>>((selector) => {
          // в случае ошибки возвращаем предыдущее состояние поля
          admin.active = prevActive;
          return selector;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          admin.active = response.data.active;
        } else {
          admin.active = prevActive;
        }
      });
  }

  public delete(admin: AdminModel): void {
    this.gloader.enable();
    this.adminRepository.delete(admin.id)
      .subscribe((response) => {
        this.gloader.disable();
      });
  }
}