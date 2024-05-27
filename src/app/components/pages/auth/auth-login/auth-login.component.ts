import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { EAuthType } from '../../../../modules/auth/models';
import { UserService } from 'src/app/modules/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AUTH_CONFIG } from 'src/constants';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AuthLoginComponent implements OnInit {
  public passwordMinLength: number = AUTH_CONFIG.PASSWORD.MIN_LENGTH;
  
  public loginForm: FormGroup | undefined;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    // создаем форму с полями и валидаторами
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    });
  }

  public login(event: Event) {
    event.preventDefault();

    if (this.loginForm?.valid) {
      // если форма валидна, авторизуем юзера под этими данными
      this.userService.authorize({
        id: Date.now(),
        email: this.loginForm.get('email')?.value,
        avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/697aa0102278601.5f32dffd09fdb.png',
        first_name: 'Иван',
        last_name: 'Иванов',
      });
      this.router.navigate(['/']); // редирект на главную после успешной авторизации
    }
  }

  public moveToRegister() {
    this.authService.AuthType = EAuthType.REGISTER;
  }
}
