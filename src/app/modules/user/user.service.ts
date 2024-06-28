import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from '../../../constants';
import { IUserProps, UserModel } from './models/user';
import { ERoleTypes } from './models/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isAuthorized = false;
  public currentUser: UserModel | null = null;

  public ERoleTypes = ERoleTypes;
  
  constructor(private readonly localStorageService: LocalStorageService) {}

  public authorize(userProps: IUserProps): void {
    this.isAuthorized = true;
    this.currentUser = new UserModel(userProps);

    this.localStorageService.setItem(LOCAL_STORAGE_KEYS.USER, userProps);
  }

  public logout(): void {
    this.isAuthorized = false;
    this.currentUser = null;

    this.localStorageService.removeItem(LOCAL_STORAGE_KEYS.USER);
  }
  
  public loadUser(): void {
    const lsUser = this.localStorageService.getItem<IUserProps>(LOCAL_STORAGE_KEYS.USER);
    if (!lsUser) return;

    this.authorize(lsUser);
  }
}
