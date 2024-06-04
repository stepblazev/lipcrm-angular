import { Injectable } from '@angular/core';
import { EAuthType } from './models';
import { URLParamsService } from 'src/app/shared/services/url-params.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authType: EAuthType = EAuthType.LOGIN;

  constructor(
    private readonly URLParams: URLParamsService,
  ) {}

  public get AuthType() {
    return this.authType;
  }

  public set AuthType(type: EAuthType) {
    this.URLParams.setParam('type', type);
    this.authType = type;
  }
}
