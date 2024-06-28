import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsAddComponent } from './news-add/news-add.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NewsListComponent,
    NewsDetailComponent,
    NewsAddComponent,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnDestroy {
  constructor(public readonly news: NewsService) {}

  ngOnDestroy(): void {
    this.news.reset();
  }
  
  public newsIcon = faNewspaper;
  public closeIcon = faXmark;
}
