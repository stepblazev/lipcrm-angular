import { IBaseHttpResponse, IMetaPagination } from 'src/app/core/http-response';
import { INewsProps } from '../models/news';

export interface INewsPayloadDTO {
  order_column?: string;
  order_by?: 'ASC' | 'DESC';

  page: number;
  per_page: number;
}

export interface INewsResponseDTO extends IBaseHttpResponse<INewsProps[], IMetaPagination> {}
