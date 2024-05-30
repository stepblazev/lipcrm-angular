import { IBaseHttpResponse } from "src/app/core/http-response";
import { IAdminProps } from "../models/admin";

export interface ICreateAdminPayloadDTO {
    image: File | null;
    fio: string;
    company_name: string;
    phone: string;
    email: string;
    password: string;
}

export interface ICreateAdminResponseDTO extends IBaseHttpResponse<IAdminProps> {}
