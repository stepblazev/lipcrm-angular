import { IBaseHttpResponse } from 'src/app/core/http-response';
import { IAdminProps } from '../models/admin';

export interface IAdminsResponseDTO extends IBaseHttpResponse<IAdminProps[]> {}