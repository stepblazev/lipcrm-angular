import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { ILoginPayloadDTO, ILoginResponseDTO } from '../dto/login.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository {
  constructor(private readonly http: HttpClient) {}

  public login(payload: ILoginPayloadDTO) {
    return this.http.post<ILoginResponseDTO>(
      `${BASE_URL}${API_URL}/login`, { ...payload }, { withCredentials: true }
    );
  }

  public logout() {
    return this.http.post<null>(
      `${BASE_URL}${API_URL}/logout`, { }, { withCredentials: true }
    );
  }
}
