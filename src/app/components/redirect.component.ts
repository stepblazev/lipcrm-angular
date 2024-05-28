import { Component, OnInit } from '@angular/core';
import { UserService } from '../modules/user/user.service';
import { Router } from '@angular/router';
import { ERoleTypes } from '../modules/user/models/role';

@Component({
  standalone: true,
  selector: 'app-redirect',
  template: '',
})
// NOTE Компонент предназначен для редиректа с невалидного URL
export class RedirectComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  public ngOnInit(): void {
    const currentUser = this.userService.currentUser;

    if (!currentUser) {
      this.router.navigate(['auth']);
      return;
    }

    switch (currentUser.role.name) {
      case ERoleTypes.SUPERADMIN:
        this.router.navigate(['admins']);
        break;
      case ERoleTypes.ADMIN:
      case ERoleTypes.SUBADMIN:
        this.router.navigate(['statistics']);
        break;
      case ERoleTypes.LOGIST:
      case ERoleTypes.OPERATOR:
      case ERoleTypes.AGENT:
        this.router.navigate(['trips']);
        break;
      default:
        this.router.navigate(['auth']);
        break;
    }
  }
}
