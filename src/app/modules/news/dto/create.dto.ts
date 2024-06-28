import { IBaseHttpResponse } from 'src/app/core/http-response';
import { INewsProps } from '../models/news';

export interface ICreateNewsPayloadDTO {
  title: string;
  content: string;
}

export interface ICreateNewsResponseDTO extends IBaseHttpResponse<INewsProps> {}
