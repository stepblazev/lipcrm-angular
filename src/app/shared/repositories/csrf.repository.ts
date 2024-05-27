import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CsrfRepository {
  constructor(private readonly http: HttpClient) {}

  public getCSRF() {
    return this.http.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
  }
}
