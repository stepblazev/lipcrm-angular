import { IBaseHttpResponse } from 'src/app/core/http-response';
import { IUserProps } from '../../user/models/user';

export interface ILoginPayloadDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO extends IBaseHttpResponse<IUserProps> {}
