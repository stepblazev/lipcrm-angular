import { Injectable } from '@angular/core';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { IAdminsPayloadDTO, IAdminsResponseDTO } from '../dto/admins.dto';
import { IAdminDetailResponseDTO } from '../dto/admin.dto';
import { ICreateAdminPayloadDTO, ICreateAdminResponseDTO } from '../dto/create.dto';
import { objectToFormData } from 'src/app/shared/utils/object-to-form';
import { IUpdateAdminPayloadDTO } from '../dto/update.dto';
import { IDeleteAdminResponseDTO } from '../dto/delete.dto';
import { objectToUrlParams } from 'src/app/shared/utils/object-to-url-params';

@Injectable({
  providedIn: 'root',
})
export class AdminRepository {
  constructor(private readonly http: HttpClient) {}

  public admins(payload: IAdminsPayloadDTO) {
    const params = objectToUrlParams(payload);
    return this.http.get<IAdminsResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin?${params}`,
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
    // переносим данные из payload в FormData (для отправки изображения)
    const formData = objectToFormData(payload);

    return this.http.post<ICreateAdminResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin`,
      formData,
      { withCredentials: true }
    );
  }

  public update(payload: IUpdateAdminPayloadDTO) {
    // выносим id из payload
    const { id, ...data } = payload; 
    return this.http.put<ICreateAdminResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin/${id}`,
      data,
      { withCredentials: true }
    );
  }

  public delete(id: number | string) {
    return this.http.delete<IDeleteAdminResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/admin/${id}`,
      { withCredentials: true }
    );
  }
}
