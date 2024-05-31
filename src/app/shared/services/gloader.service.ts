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
export class GloaderService {
  private _isLoading: boolean = false;

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(state: boolean) {
    this._isLoading = state;
  }
  
  public enable(): void {
    this.isLoading = true;
  }
  
  public disable(): void {
    this.isLoading = false;
  }
}
