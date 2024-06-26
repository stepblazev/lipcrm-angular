import { Component } from '@angular/core';
import { ENewsModes, NewsService } from 'src/app/modules/news/news.service';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
    ENewsModes = ENewsModes;
    
    constructor (public readonly news: NewsService) {}
}
