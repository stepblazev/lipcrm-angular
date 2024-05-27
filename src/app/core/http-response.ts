interface IError {
    message: string;
}

export interface IBaseHttpResponse<T, E = null> {
    success: boolean;
    data: T,
    error: IError | null 
}