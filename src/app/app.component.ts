import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { UserService } from './modules/user/user.service';
import { ConfirmComponent } from './components/features/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, ConfirmComponent, HeaderComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = 'CRM';

  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit(): void {
    // загружаем данные пользователя из LocalStorage (если есть)
    this.userService.loadUser();
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
