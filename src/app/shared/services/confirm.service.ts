import { Injectable } from '@angular/core';
import { Observable, Subject, first } from 'rxjs';

export interface IConfirmData {
  title: string;
  message: string;
  confirm?: string;
  cancel?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  public confirmSubject = new Subject<boolean>();

  public data: IConfirmData = { title: '', message: '' };
  public isOpened: boolean = false;

  public confirm(payload: IConfirmData): Observable<boolean> {
    this.data = payload;
    this.openConfirm();
    this.confirmSubject = new Subject<boolean>();
    return this.confirmSubject.asObservable().pipe(first());
  }

  public respond(answer: boolean): void {
    this.closeConfirm();
    this.confirmSubject.next(answer);
    this.confirmSubject.complete();
  }

  public openConfirm() {
    this.isOpened = true;
  }

  public closeConfirm() {
    this.isOpened = false;
  }
}