import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../modules/auth/auth.service';
import { EAuthType } from '../../../../modules/auth/models';
import { UserService } from 'src/app/modules/user/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-auth-recovery',
  templateUrl: './auth-recovery.component.html',
  styleUrl: './auth-recovery.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AuthRecoveryComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {

  }

  public moveToLogin() {
    this.authService.AuthType = EAuthType.LOGIN;
  }
}
