import { IBaseHttpResponse, IMetaPagination } from 'src/app/core/http-response';
import { IAdminProps } from '../models/admin';

export interface IAdminsPayloadDTO {
  search?: string;
  order_column?: string;
  order_by?: 'ASC' | 'DESC';

  page: number;
  per_page: number;
}

export interface IAdminsResponseDTO extends IBaseHttpResponse<IAdminProps[], IMetaPagination> {}
