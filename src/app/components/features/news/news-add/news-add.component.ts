import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/app/modules/news/news.service';

@Component({
  selector: 'app-news-add',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss'
})
export class NewsAddComponent {
    constructor(public readonly news: NewsService) {}
    
    public create(event: Event): void {
        event.preventDefault();
        alert('Create news...');
    }
    
    public backIcon = faArrowLeftLong;
}
