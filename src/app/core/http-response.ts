export interface IBaseHttpResponse<T, E = null> {
    success: boolean;
    data: T,
    error: E
}