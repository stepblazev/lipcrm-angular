import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminRepository } from 'src/app/modules/admins/repositories/admin.repository';
import { AUTH_CONFIG } from 'src/constants';

@Component({
  selector: 'app-admins-new',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admins-new.component.html',
  styleUrl: './admins-new.component.scss',
})
export class AdminsNewComponent implements OnInit {
  public passwordMinLength: number = AUTH_CONFIG.PASSWORD.MIN_LENGTH;

  public form: FormGroup | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly adminRepository: AdminRepository
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fio: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
      password_repeat: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    });
  }

  public create(): void {
    // ... логика добавления
  }

  public reset(): void {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  }
}
