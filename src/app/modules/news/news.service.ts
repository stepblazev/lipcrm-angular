import { Injectable } from '@angular/core';
import { NewsModel } from './models/news';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from 'src/constants';
import { ENewsModes } from './modes.enum';
import { NewsRepository } from './repositories/news.repository';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
    public news: NewsModel[] = []
    public detail: NewsModel | null = null;
    
    // кол-во подгружаемых новостей (меньше 5 не ставить, 
    // т.к. не будет срабатывать событие скролла для дальнейшей подгрузки)
    public perPage: number = 5;
    public page: number = 1; // текущая страница
    public total: number | null = null; // кол-во всех новостей компании
    
    public isOpened: boolean = false;
    public isLoading: boolean = false;
    public mode: ENewsModes = ENewsModes.LIST;
    
    public ENewsModes = ENewsModes;
    
    constructor(
        private localStorageService: LocalStorageService,
        private newsRepository: NewsRepository,
    ) {
        if (this.localStorageService.getItem<boolean>(LOCAL_STORAGE_KEYS.NEWS)) {
            this.open();
        }
    }
    
    public reset(): void {
        this.mode = ENewsModes.LIST;
        this.page = 1;
        this.news = [];
    }
    
    public open(): void {
        this.reset();
        this.fetchNews();
        
        this.isOpened = true;
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.NEWS, true);
    }
    
    public close(): void {
        this.isOpened = false;
        this.localStorageService.setItem(LOCAL_STORAGE_KEYS.NEWS, false);
    }
    
    public fetchNews(): void {
        this.isLoading = true;
        this.newsRepository.getList({ page: this.page, per_page: this.perPage })
            .subscribe(response => {
                this.isLoading = false;
                if (response.success) {
                    const news = response.data.map(props => new NewsModel(props));
                    this.news = [...this.news, ...news];
                    this.total = response.meta.total_count;
                }
            });
    }
    
    public setMode(mode: ENewsModes): void {
        this.mode = mode;
    }
    
    public toDetail(detail: NewsModel): void {
        this.detail = detail;
        this.setMode(ENewsModes.DETAIL);
    }
}
