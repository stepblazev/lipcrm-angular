import { Injectable } from '@angular/core';
import { API_URL, BASE_URL } from '../../../../constants';
import { HttpClient } from '@angular/common/http';
import { objectToUrlParams } from 'src/app/shared/utils/object-to-url-params';
import { INewsPayloadDTO, INewsResponseDTO } from '../dto/news.dto';
import { ICreateNewsPayloadDTO, ICreateNewsResponseDTO } from '../dto/create.dto';
import { IDeleteNewsResponseDTO } from '../dto/delete.dto';

@Injectable({
  providedIn: 'root',
})
export class NewsRepository {
  constructor(private readonly http: HttpClient) {}

  public getList(payload: INewsPayloadDTO) {
    const params = objectToUrlParams(payload);
    return this.http.get<INewsResponseDTO>(
      `${BASE_URL}${API_URL}/news?${params}`,
      { withCredentials: true }
    );
  }

  public create(payload: ICreateNewsPayloadDTO) {
    return this.http.post<ICreateNewsResponseDTO>(
      `${BASE_URL}${API_URL}/news`,
      payload,
      { withCredentials: true }
    );
  }

  public delete(id: number) {
    return this.http.delete<IDeleteNewsResponseDTO>(
      `${BASE_URL}${API_URL}/news/${id}`,
      { withCredentials: true }
    );
  }
}
