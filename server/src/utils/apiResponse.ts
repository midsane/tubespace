export class ApiResponse extends Response {
    success: boolean;
    data: any;
    message: string;
    thirdPerson: boolean;
    constructor(success: boolean, data: any, message: string, thirdPerson?: boolean) {
        super();
        this.success = success;
        this.data = data;
        this.message = message;
        this.thirdPerson = thirdPerson ? thirdPerson: false
    }
}
