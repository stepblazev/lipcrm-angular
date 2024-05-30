import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { EAuthType } from '../../../../modules/auth/models';
import { UserService } from 'src/app/modules/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AUTH_CONFIG } from 'src/constants';
import { AuthRepository } from 'src/app/modules/auth/repositories/auth.repository';
import { ObservableInput, catchError } from 'rxjs';
import { ILoginResponseDTO } from 'src/app/modules/auth/dto/login.dto';
import { ToastrService } from 'ngx-toastr';
import { GloaderService } from 'src/app/shared/services/gloader.service';

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
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly gloaderService: GloaderService,
    private readonly toastr: ToastrService
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
    
    if (this.loginForm?.invalid) {
        this.loginForm.markAllAsTouched();
        return;
    }
    
    // включаем глобальный лоадер
    this.gloaderService.isLoading = true;
    
    // отключаем возможность вносить изменения в форму
    this.loginForm?.disable();

    // получаем email и пароль из формы
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;

    // выполняем вход под этими данными
    this.authRepository
      .login({ email, password })
      .pipe(
        catchError<ILoginResponseDTO, ObservableInput<ILoginResponseDTO>>(
          (selector) => {
            // включаем форму и очищаем поле с паролем
            this.loginForm?.enable();
            this.loginForm?.setValue({ email: email, password: '' });
            return selector;
          }
        )
      )
      .subscribe((response) => {
        if (response.success) {
          // сохраняем данные пользователя в браузере и выводим уведомление
          this.userService.authorize(response.data);
          this.toastr.success(`Выполнен вход как ${response.data.role.display_name.toLowerCase()}`);

          // выключаем глобальный лоадер
          this.gloaderService.isLoading = false;
          
          // редирект на главную после успешной авторизации
          this.router.navigate(['/']);
        }
      });
  }

  public moveToRecovery() {
    this.authService.AuthType = EAuthType.RECOVERY;
  }
}
