import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from 'src/app/modules/auth/repositories/auth.repository';
import { UserService } from 'src/app/modules/user/user.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule],
})
export class HeaderComponent {
  public isMenuOpened: boolean = false;

  constructor(
    public readonly userService: UserService,
    private readonly router: Router,
    private readonly authRepository: AuthRepository,
    private readonly confirmService: ConfirmService
  ) {}

  public logout(): void {
    this.confirmService
      .confirm({
        title: 'Выйти?',
        message: 'Вы действительно хотите выйти из учетной записи?',
        confirm: 'Да',
        cancel: 'Нет',
      })
      .subscribe((answer: boolean) => {
        if (answer) {
          // выход из учетной записи на стороне сервера
          this.authRepository.logout().subscribe(() => {
            // очищаем данные в браузере
            this.userService.logout();
            // редиректим на страницу с авторизацией
            this.router.navigate(['auth']);
          });
        }
      });
  }
}
