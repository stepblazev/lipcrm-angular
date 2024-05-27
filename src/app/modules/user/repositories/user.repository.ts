import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserRepository {
  constructor(private readonly _http: HttpClient) {}

//   public user() {
//     return this._http.get<ILoginResponseDTO>(`${BASE_URL}${API_URL}/user`);
//   }
}