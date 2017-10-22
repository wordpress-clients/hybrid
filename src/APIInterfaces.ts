export interface IAPIError {
    code: string;
    message: string;
    data: {
        status: number
    };
}