import { Component } from '@angular/core';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRecoveryComponent } from './auth-recovery/auth-recovery.component';
import { AuthService } from '../../../modules/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { EAuthType } from '../../../modules/auth/models';
import { CommonModule } from '@angular/common';
import qs from 'qs';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, AuthLoginComponent, AuthRecoveryComponent],
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

        if ('type' in parsedQuery && parsedQuery['type'] == EAuthType.RECOVERY) {
          this.authService.AuthType = EAuthType.RECOVERY;
        } else {
          this.authService.AuthType = EAuthType.LOGIN;
        }
      }
    });
  }
}
