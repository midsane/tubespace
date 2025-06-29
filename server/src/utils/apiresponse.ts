export class ApiResponse extends Response {
    data: any;
    message: string;
    constructor(data: any, message: string) {
        super();
        this.data = data;
        this.message = message;
    }
}