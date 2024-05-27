import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { UserService } from './modules/user/user.service';
import { ConfirmComponent } from './components/features/confirm/confirm.component';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/layout/main-menu/main-menu.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    ConfirmComponent,
    MainMenuComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'shipment-crm';

  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit(): void {
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
