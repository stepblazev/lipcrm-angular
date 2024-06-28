import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ObservableInput, catchError } from 'rxjs';
import { IDeleteNewsResponseDTO } from 'src/app/modules/news/dto/delete.dto';
import { ENewsModes } from 'src/app/modules/news/modes.enum';
import { NewsService } from 'src/app/modules/news/news.service';
import { NewsRepository } from 'src/app/modules/news/repositories/news.repository';
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
  public isDeleting: boolean = false;
    
  constructor(
    public readonly news: NewsService,
    public readonly user: UserService,
    public readonly newsRepository: NewsRepository,
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
            this.isDeleting = true;
            const id = this.news.detail?.id;
            if (!id) return;
            
            this.newsRepository.delete(id)
                .pipe(
                    catchError<IDeleteNewsResponseDTO, ObservableInput<IDeleteNewsResponseDTO>>(
                        (selector) => {
                            this.isDeleting = false;
                            return selector;
                        }
                    )
                )
                .subscribe(response => {
                    if (response.success) {
                        this.news.news = this.news.news.filter(news => news.id !== id);
                        this.news.setMode(ENewsModes.LIST);
                    }
                    this.isDeleting = false;
                });
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
