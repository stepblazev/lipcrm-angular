import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../user.service';
import { ERoleTypes } from '../models/role';

export const SuperadminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  // если юзер не авторизован или не имеет 
  // прав суперадмина, редиректим на страницу с авторизацией
  if (userService.currentUser?.role.name !== ERoleTypes.SUPERADMIN) {
    router.navigate(['auth']);
    return false;
  }

  return true;
};
