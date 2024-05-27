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
    private readonly toastr: ToastrService
  ) {}

  public ngOnInit(): void {
    // создаем форму с полями и валидаторами
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.passwordMinLength)],
      ],
    });
  }

  public login(event: Event) {
    event.preventDefault();

    if (this.loginForm?.valid) {
      // если форма валидна,выполняем вход под этими данными
      this.authRepository
        .login({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        })
        .pipe(
          catchError<ILoginResponseDTO, ObservableInput<ILoginResponseDTO>>(
            (selector) => {
              const response = selector.error as ILoginResponseDTO;
              this.toastr.error(response.error?.message, 'Ошибка входа');
              return selector;
            }
          )
        )
        .subscribe((response) => {
            if (response.success) {
                this.userService.authorize(response.data);
                this.toastr.success(response.data.role.display_name, 'Вход выполнен');
                this.router.navigate(['/']); // редирект на главную после успешной авторизации
            }
        });
    }
  }

  public moveToRecovery() {
    this.authService.AuthType = EAuthType.RECOVERY;
  }
}
