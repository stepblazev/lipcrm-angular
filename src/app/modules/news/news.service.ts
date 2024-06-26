import { Injectable } from '@angular/core';

export enum ENewsModes {
    LIST = 'list',
    DETAIL = 'detail',
    ADD = 'add',
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
    public isOpened: boolean = false;
    public mode: ENewsModes = ENewsModes.LIST;
    
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
}
