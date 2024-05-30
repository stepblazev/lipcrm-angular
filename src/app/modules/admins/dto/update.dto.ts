import { IBaseHttpResponse } from "src/app/core/http-response";
import { IAdminProps } from "../models/admin";

export interface IUpdateAdminPayloadDTO {
    id: number | string;
    active?: boolean;
    image?: File | null;
    fio?: string;
    company_name?: string;
    phone?: string;
    email?: string;
    password?: string;
}

export interface IUpdateAdminResponseDTO extends IBaseHttpResponse<IAdminProps> {}
