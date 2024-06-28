import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/news.service';
import { ERoleTypes } from 'src/app/modules/user/models/role';
import { UserService } from 'src/app/modules/user/user.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss',
})
export class NewsDetailComponent {
  constructor(
    public readonly news: NewsService,
    public readonly user: UserService,
    private readonly confirm: ConfirmService
  ) {}

  public delete(): void {
    this.confirm
      .confirm({
        title: 'Удаление новости',
        message: 'Вы действительно хотите удалить новость без возможности восстановления?',
        cancel: 'Отмена',
        confirm: 'Удалить',
      })
      .subscribe((answer) => {
        if (answer) {
          // ... логика удаления
        }
      });
  }
  
  public allowDelete(): boolean {
    return this.user.currentUser !== null && 
        (
            this.user.currentUser.role.name === ERoleTypes.ADMIN ||
            this.user.currentUser.role.name === ERoleTypes.SUBADMIN ||
            this.user.currentUser.role.name === ERoleTypes.LOGIST
    );
  }

  public backIcon = faArrowLeftLong;
  public deleteIcon = faTrashCan;
}
