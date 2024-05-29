import { Injectable } from '@angular/core';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { IAdminsResponseDTO } from '../dto/admins.dto';
import { IAdminDetailResponseDTO } from '../dto/admin.dto';
import { ICreateAdminPayloadDTO, ICreateAdminResponseDTO } from '../dto/create.dto';

@Injectable({
  providedIn: 'root',
})
export class AdminRepository {
  constructor(private readonly http: HttpClient) {}

  public admins() {
    return this.http.get<IAdminsResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin`,
      { withCredentials: true }
    );
  }

  public admin(id: number | string) {
    return this.http.get<IAdminDetailResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin/${id}`,
      { withCredentials: true }
    );
  }

  public create(payload: ICreateAdminPayloadDTO) {
    return this.http.post<ICreateAdminResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin`,
      { ...payload },
      { withCredentials: true }
    );
  }
}
