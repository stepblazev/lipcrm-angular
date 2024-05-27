import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from '../../../constants';
import { IUserProps, UserModel } from './models/user';
import { ELoadingStatus } from 'src/app/core/loading-status';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthorized = false;
  public currentUser: UserModel | null = null;
  public loadingStatus: ELoadingStatus = ELoadingStatus.INITIAL_LOADING;

  constructor(
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  public authorize(userProps: IUserProps): void {
    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.USER, userProps);

    this.isAuthorized = true;
    this.currentUser = new UserModel(userProps);
  }

  public loadUser(): void {
    const lsUser = this.localStorageService.getItem<IUserProps>(
      LOCAL_STORAGE_KEYS.USER
    );
    if (!lsUser) return;

    this.authorize(lsUser);
  }

  public logout(): void {
    this.isAuthorized = false;
    this.currentUser = null;

    this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.USER);
    this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.AUTHORIZED);
  }
}
