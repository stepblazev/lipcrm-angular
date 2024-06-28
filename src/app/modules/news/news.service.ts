import { Injectable } from '@angular/core';
import { NewsModel } from './models/news';
import { loremNews } from './models/lorem';

export enum ENewsModes {
    LIST = 'list',
    DETAIL = 'detail',
    ADD = 'add',
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
    public news: NewsModel[] = []
    public isOpened: boolean = false;
    public mode: ENewsModes = ENewsModes.LIST;
    public ENewsModes = ENewsModes;
    
    public detail: NewsModel | null = null;
    
    constructor() {
        this.news = loremNews.map(news => new NewsModel(news));
    }
    
    public open(): void {
        this.mode = ENewsModes.LIST;
        this.isOpened = true;
    }
    
    public close(): void {
        this.isOpened = false;
    }
    
    public setMode(mode: ENewsModes): void {
        this.mode = mode;
    }
    
    public toDetail(detail: NewsModel): void {
        this.detail = detail;
        this.setMode(ENewsModes.DETAIL);
    }
}
