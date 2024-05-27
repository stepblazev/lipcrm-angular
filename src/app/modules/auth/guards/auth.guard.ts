import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../user/user.service';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  // если юзер не авторизован, редирект на страницу с авторизацией
  if (!userService.isAuthorized) {
    router.navigate(['auth']);
    return false;
  }

  return true;
};

export const NotAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  // если юзер авторизован, редирект на главную страницу
  if (userService.isAuthorized) {
    router.navigate(['']);
    return false;
  }

  return true;
};
