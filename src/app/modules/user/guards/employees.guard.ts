import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../user.service';
import { ERoleTypes } from '../models/role';

export function EmployeesGuard(allowedRoles: ERoleTypes[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    const userService = inject(UserService);

    if (userService.currentUser && !allowedRoles.includes(userService.currentUser?.role.name)) {
      router.navigate(['auth']);
      return false;
    }

    return true;
  };
}
