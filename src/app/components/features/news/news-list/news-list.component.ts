import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ENewsModes, NewsService } from 'src/app/modules/news/news.service';
import { ERoleTypes } from 'src/app/modules/user/models/role';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  constructor(
    public readonly news: NewsService,
    public readonly user: UserService
  ) {}
  
  public allowAdd(): boolean {
    return this.user.currentUser !== null && 
        (
            this.user.currentUser.role.name === ERoleTypes.ADMIN ||
            this.user.currentUser.role.name === ERoleTypes.SUBADMIN ||
            this.user.currentUser.role.name === ERoleTypes.LOGIST
    );
  }
}
