export class ApiError extends Error {
    statusCode: number;
    error: any[];
    success: boolean;
    data: null;

    constructor(
        statusCode: number,
        message: string,
        error: any[] = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.success = false
        this.data = null

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ApiResponse {
    statusCode: number;
    message: string;
    data: any[];
    success: boolean;

    constructor(
        statusCode: number,
        message: string,
        data: any[] = []
    ) {
        this.statusCode = statusCode
        this.message = message
        this.data = data
        this.success = statusCode < 400
    }
}