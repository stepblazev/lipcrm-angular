interface IError {
    message: string;
}

export interface IBaseHttpResponse<T, M = null, E = null> {
    success: boolean;
    data: T,
    meta: M,
    error: IError | null 
}

export interface IMetaPagination {
    total_count: number;
    current_page: number;
    per_page: number;
}