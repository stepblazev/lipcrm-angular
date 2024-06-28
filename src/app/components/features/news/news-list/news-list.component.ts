import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/modules/news/news.service';
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
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
    
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
  
  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => this.onScroll());
  }

  private onScroll(): void {
    if (this.news.isLoading || this.news.total === this.news.news.length) return;
    
    const element = this.scrollContainer.nativeElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 30) {
      this.news.page++;
      this.news.fetchNews();
    }
  }
}
