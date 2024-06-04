import { Injectable } from '@angular/core';
import { AdminRepository } from './repositories/admin.repository';
import { AdminModel } from './models/admin';
import { ObservableInput, Subject, catchError, debounceTime, distinctUntilChanged } from 'rxjs';
import { IUpdateAdminResponseDTO } from './dto/update.dto';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { IAdminsPayloadDTO } from './dto/admins.dto';
import { IAdminFilter } from './models/filter.interface';
import { URLParamsService } from 'src/app/shared/services/url-params.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public admins: AdminModel[] = []; // массив админов
  public totalCount: number = 0; // общее кол-во найденных результатов

  public filter: IAdminFilter = {}; // фильтр для выборки админов
  public filterSubject = new Subject<IAdminFilter>();

  public perPage: number = 15; // кол-во админов на каждой странице
  public currentPage: number = 1; // текущая страница

  public isNewOpened: boolean = false; // Открыто ли окно для добавления нового админа

  constructor(
    private readonly gloader: GloaderService,
    private readonly adminRepository: AdminRepository,
    private readonly URLParams: URLParamsService,
  ) { 
    this.filterSubject.pipe(
        debounceTime(700),
        distinctUntilChanged()
    ).subscribe(() => {
        this.applyFilter();
    });
  }

  public resetContext(): void {
    this.filter = {}; // очищаем фильтр
    this.admins = []; // очищаем список админов
    this.currentPage = 1;
    this.totalCount = 0;
  }
  
  public updateFilter(): void {
    this.filterSubject.next({ ...this.filter });
  }

  public applyFilter(): void {
    this.fetchAdmins({ ...this.filter, page: 1 });
  }

  public setPage(page: number): void {
    this.fetchAdmins({ ...this.filter, page });
  }

  public fetchAdmins(payload: Omit<IAdminsPayloadDTO, 'per_page'> = { page: this.currentPage }): void {
    this.gloader.enable();
    this.adminRepository
      .admins({ ...payload, per_page: this.perPage })
      .subscribe((response) => {
        this.gloader.disable();
        if (response.success) {
          this.admins = response.data.map(
            (adminProps) => new AdminModel(adminProps)
          );
          this.totalCount = response.meta.total_count;
          this.currentPage = response.meta.current_page;
          this.URLParams.setParams(payload);
          this.filter = payload;
        }
      });
  }

  public setActive(admin: AdminModel, active: boolean): void {
    // запоминаем предыдущее состояние поля
    const prevActive = admin.active;
    admin.active = active;

    this.adminRepository
      .update({ id: admin.id, active: active })
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
    this.adminRepository.delete(admin.id).subscribe((response) => {
      this.gloader.disable();
    });
  }
  
  public openNew(): void {
    this.isNewOpened = true;
  }

  public closeNew(): void {
    this.isNewOpened = false;
  }
}
