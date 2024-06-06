import { IBaseHttpResponse } from "src/app/core/http-response";
import { IPermissionProps } from "../../user/models/company";

export interface IPermissionResponseDTO extends IBaseHttpResponse<IPermissionProps[]> {}
