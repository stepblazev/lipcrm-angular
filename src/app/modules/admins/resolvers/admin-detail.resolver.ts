import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AdminModel } from '../models/admin';
import { AdminRepository } from '../repositories/admin.repository';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { map } from 'rxjs';

export const AdminDetailResolver: ResolveFn<AdminModel> = (route: ActivatedRouteSnapshot) => {
  const gloader = inject(GloaderService);
  const adminRepository = inject(AdminRepository);

  gloader.enable();
  const adminId = route.paramMap.get('id');

  return adminRepository.admin(adminId!).pipe(
    map((response) => {
      gloader.disable();
      return new AdminModel(response.data);
    })
  );
};
