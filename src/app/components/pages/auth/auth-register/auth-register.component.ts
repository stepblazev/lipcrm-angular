import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { EAuthType } from '../../../../modules/auth/models';
import { UserService } from 'src/app/modules/user/user.service';
import { Router } from '@angular/router';
import { AUTH_CONFIG } from 'src/constants';
import { CommonModule } from '@angular/common';
import { matchPasswords } from 'src/app/shared/validators/match-passwords';

@Component({
  standalone: true,
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AuthRegisterComponent implements OnInit {
  public passwordMinLength: number = AUTH_CONFIG.PASSWORD.MIN_LENGTH;

  public registerForm: FormGroup | undefined;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
      password_repeat: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    }, { validators: matchPasswords });
  }

  public register(event: Event) {
    event.preventDefault();

    if (this.registerForm?.valid) {
      this.userService.authorize({
        id: Date.now(),
        email: this.registerForm.get('email')?.value,
        avatar:
          'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/697aa0102278601.5f32dffd09fdb.png',
        first_name: this.registerForm.get('first_name')?.value,
        last_name: this.registerForm.get('last_name')?.value,
      });

      this.router.navigate(['/']);
    }
  }

  public moveToLogin() {
    this.authService.AuthType = EAuthType.LOGIN;
  }
}
