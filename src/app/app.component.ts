import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { UserService } from './modules/user/user.service';
import { ConfirmComponent } from './components/features/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { GloaderComponent } from './components/features/gloader/gloader.component';
import { UserRepository } from './modules/user/repositories/user.repository';
import { ObservableInput, catchError, first } from 'rxjs';
import { IMeResponseDTO } from './modules/user/dto/me.dto';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    ConfirmComponent,
    HeaderComponent,
    CommonModule,
    GloaderComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'CRM';

  constructor(
    private router: Router,
    private userService: UserService,
    private userRepository: UserRepository
  ) {}

  public ngOnInit(): void {
    // загружаем данные пользователя из LocalStorage (если есть)
    this.userService.loadUser();

    // FIXME логику можно вынести
    if (!this.userService.isAuthorized) return;
    // отправляем запрос на сервер для получение актуальных данных пользователя
    this.userRepository.me()
      .pipe(
        first(),
        catchError<IMeResponseDTO, ObservableInput<IMeResponseDTO>>(
          (selector) => {
            // в случае ошибки выходим из учетной записи в браузере
            this.userService.logout();
            this.router.navigate(['auth']);
            return selector;
          }
        )
      )
      .subscribe((response) => {
        if (response.success) {
          // если все успешно, обновляем данные
          this.userService.authorize(response.data);
        } else {
          // если нет, выходим из учетной записи в браузере
          this.userService.logout();
          this.router.navigate(['auth']);
        }
      });
  }

  public isActiveRoute(path: string): boolean {
    const options: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };

    return this.router.isActive(path, options);
  }
}
