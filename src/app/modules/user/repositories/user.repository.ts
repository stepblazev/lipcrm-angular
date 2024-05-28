import { Injectable } from '@angular/core';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { IMeResponseDTO } from '../dto/me.dto';

@Injectable({
    providedIn: 'root'
})
export class UserRepository {
  constructor(private readonly _http: HttpClient) {}

  public me() {
    return this._http.get<IMeResponseDTO>(`${BASE_URL}${API_URL}/user`, { withCredentials: true });
  }
}