import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterLink } from '@angular/router';
import { AuthRepository } from 'src/app/modules/auth/repositories/auth.repository';
import { UserService } from 'src/app/modules/user/user.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { menuLinks } from 'src/app/modules/menu/links';
import { IMenuLink } from 'src/app/modules/menu/link.interface';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
})
export class HeaderComponent implements OnInit{
  public links: IMenuLink[] = [];

  constructor(
    public readonly userService: UserService,
    private readonly router: Router,
    private readonly authRepository: AuthRepository,
    private readonly confirmService: ConfirmService,
    private readonly gloaderService: GloaderService
  ) {}

  public ngOnInit(): void {
    if (this.userService.currentUser) {
        this.links = menuLinks[this.userService.currentUser.role.name];
    }
  }
  
  public isActiveRoute(path: string): boolean {
    if (path.length > 1 && location.pathname.startsWith(path)) return true;
    
    const options: IsActiveMatchOptions = {
      paths: 'exact',
      fragment: 'ignored',
      queryParams: 'ignored',
      matrixParams: 'ignored',
    };

    return this.router.isActive(path, options);
  }
  
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
          this.gloaderService.isLoading = true;

          // выход из учетной записи на стороне сервера
          this.authRepository.logout().subscribe(() => {
            this.userService.logout(); // очищаем данные в браузере
            this.gloaderService.isLoading = false;
            this.router.navigate(['auth']); // редиректим на страницу с авторизацией
          });
        }
      });
  }

  // икноки
  public logoutIcon = faArrowRightFromBracket;
}
