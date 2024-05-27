import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EAuthType } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authType: EAuthType = EAuthType.LOGIN;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public get AuthType() {
    return this.authType;
  }

  public set AuthType(type: EAuthType) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        type: type,
      },
    });

    this.authType = type;
  }
}
