import { Injectable } from '@angular/core';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { IAdminsPayloadDTO, IAdminsResponseDTO } from '../dto/admins.dto';
import { objectToUrlParams } from 'src/app/shared/utils/object-to-url-params';
import { IPermissionProps } from '../../user/models/company';
import { IPermissionResponseDTO } from '../dto/persmissions.dto';

@Injectable({
  providedIn: 'root',
})
export class PermissionRepository {
  constructor(private readonly http: HttpClient) {}

  public permissions() {
    return this.http.get<IPermissionResponseDTO>(
      `${BASE_URL}${API_URL}/superadmin/permissions`,
      { withCredentials: true }
    );
  }
}
