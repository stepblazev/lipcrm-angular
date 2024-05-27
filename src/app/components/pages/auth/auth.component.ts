import { Component } from '@angular/core';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthService } from '../../../modules/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { EAuthType } from '../../../modules/auth/models';
import qs from 'qs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, AuthLoginComponent, AuthRegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  public EAuthType = EAuthType;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {
    // парсинг url и получение type
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const parsedQuery = qs.parse(this.router.url.split('?')[1]);

        if (
          'type' in parsedQuery &&
          parsedQuery['type'] == EAuthType.REGISTER
        ) {
          this.authService.AuthType = EAuthType.REGISTER;
        } else {
          this.authService.AuthType = EAuthType.LOGIN;
        }
      }
    });
  }
}
