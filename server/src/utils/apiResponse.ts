export class ApiResponse extends Response {
    success: boolean;
    data: any;
    message: string;
    constructor(success: boolean, data: any, message: string) {
        super()
        this.success = success;
        this.data = data;
        this.message = message
    }
}