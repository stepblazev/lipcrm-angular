import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/user.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { BreadcrumbsComponent } from '../../features/breadcrumbs/breadcrumbs.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, BreadcrumbsComponent],
})
export class HeaderComponent {
  public isMenuOpened: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly elRef: ElementRef,
    public readonly userService: UserService,
    public readonly confirmService: ConfirmService
  ) {}

  public logout(): void {
    this.confirmService
      .confirm({
        title: 'Подтверждение действия',
        message: 'Вы действительно хотите выйти из учетной записи?',
      })
      .subscribe((answer: boolean) => {
        if (answer) {
          this.userService.logout();
          this.router.navigate(['auth']);
        }
      });
  }
  
  public isRootFolder(): boolean {
    return location.pathname == '/';
  }

  @HostListener('body:click', ['$event'])
  handleClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isMenuOpened = false;
    }
  }
}
