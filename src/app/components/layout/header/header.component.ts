import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IsActiveMatchOptions, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthRepository } from 'src/app/modules/auth/repositories/auth.repository';
import { UserService } from 'src/app/modules/user/user.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { GloaderService } from 'src/app/shared/services/gloader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { menuLinks } from 'src/app/modules/menu/links';
import { IMenuLink } from 'src/app/modules/menu/link.interface';
import { faArrowRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import { ISettingLink } from 'src/app/modules/settings/link.interface';
import { settingLinks } from 'src/app/modules/settings/links';
import { ERoleTypes } from 'src/app/modules/user/models/role';
import { faHardDrive } from '@fortawesome/free-regular-svg-icons';
import { PopupComponent } from '../../ui/popup/popup.component';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, FontAwesomeModule, RouterLink, PopupComponent],
})
export class HeaderComponent implements OnInit{
  public links: IMenuLink[] = [];
  public settingLinks: ISettingLink[] = [];
  
  public showSettings: boolean = false;
  public showStorage: boolean = false;

  @ViewChild('settings') settings: ElementRef<HTMLInputElement>;
  @ViewChild('settingsBtn') settingsBtn: ElementRef<HTMLInputElement>;
  
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
        if (this.isAdmin()) {
            this.settingLinks = settingLinks;
        }
    }
    
    // при изменении страницы, закрываем меню настроек
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.showSettings = false;
      });
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
  
  public isAdmin(): boolean {
    return this.userService.currentUser?.role.name === ERoleTypes.ADMIN ||
        this.userService.currentUser?.role.name === ERoleTypes.SUBADMIN;
  }
  
  @HostListener('document:click', ['$event'])
  public handleClick(event: Event) {
    if (!this.isAdmin()) return;
    const target = event.target as HTMLDivElement;
    if (!this.settings.nativeElement.contains(target) && !this.settingsBtn.nativeElement.contains(target)) {
      this.showSettings = false;
    }
  }

  public settingsIcon = faGear;
  public storageIcon = faHardDrive;
  public logoutIcon = faArrowRightFromBracket;
}
