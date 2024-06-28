import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ObservableInput, catchError } from 'rxjs';
import { ICreateNewsPayloadDTO, ICreateNewsResponseDTO } from 'src/app/modules/news/dto/create.dto';
import { NewsModel } from 'src/app/modules/news/models/news';
import { NewsService } from 'src/app/modules/news/news.service';
import { NewsRepository } from 'src/app/modules/news/repositories/news.repository';

@Component({
  selector: 'app-news-add',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './news-add.component.html',
  styleUrl: './news-add.component.scss'
})
export class NewsAddComponent implements OnInit {
    public form: FormGroup;
    
    constructor(
        public readonly news: NewsService,
        private readonly newsRepository: NewsRepository,
        private readonly fb: FormBuilder
    ) {}
    
    ngOnInit(): void {
        this.form = this.fb.group({
          title: ['', [Validators.required, Validators.maxLength(255)]],
          content: ['', [Validators.required, Validators.maxLength(5000)]],
        });
      }
    
    public create(event: Event): void {
        event.preventDefault();
        
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        
        this.form.disable();
        
        const payload: ICreateNewsPayloadDTO = this.form.value;
        this.newsRepository.create(payload)
            .pipe(
                catchError<ICreateNewsResponseDTO, ObservableInput<ICreateNewsResponseDTO>>(
                    (selector) => {
                        this.form.enable();
                        return selector;
                    }
                )
            )
            .subscribe(response => {
                if (response.success) {
                    const news = new NewsModel(response.data);
                    this.news.news.unshift(news);
                    this.news.toDetail(news);
                }
            });
    }
    
    public backIcon = faArrowLeftLong;
}
