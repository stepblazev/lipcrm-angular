import { IBaseHttpResponse } from 'src/app/core/http-response';
import { IUserProps } from '../models/user';

export interface IMeResponseDTO extends IBaseHttpResponse<IUserProps> {}
