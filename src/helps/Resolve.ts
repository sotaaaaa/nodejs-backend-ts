import { IRequest, IResponse } from '../types/Server';
import Util from './Utils';
import Log from '../providers/Log';

export enum STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNSUPPORTED_ACTION = 405,
    VALIDATION_FAILED = 422,
    SERVER_ERROR = 500,
    CREATED = 201,
    TOO_MANY_REQUESTS = 429,
}

interface IJsonRes {
    res: IResponse;
    body: any;
    options: {
        status: STATUS_CODE;
    };
}

class Resolve {
    public static statusToMsg(status: STATUS_CODE) {
        switch (status) {
            case STATUS_CODE.BAD_REQUEST:
                return 'Bad Request';
            case STATUS_CODE.UNAUTHORIZED:
                return 'Unauthorized';
            case STATUS_CODE.FORBIDDEN:
                return 'Forbidden';
            case STATUS_CODE.NOT_FOUND:
                return 'Not Found';
            case STATUS_CODE.UNSUPPORTED_ACTION:
                return 'Unsupported Action';
            case STATUS_CODE.VALIDATION_FAILED:
                return 'Validation Failed';
            case STATUS_CODE.SERVER_ERROR:
                return 'Internal Server Error';
            case STATUS_CODE.CREATED:
                return 'Created';
            case STATUS_CODE.OK:
                return 'Success';
            case STATUS_CODE.TOO_MANY_REQUESTS:
                return 'Too Many Requests';
        }
    }

    public static jsonResponse({ res, body, options }: IJsonRes) {
        options.status = options.status || STATUS_CODE.OK;
        res.status(options.status).json(body || null);
    }

    public static ok(
        req: IRequest,
        res: IResponse,
        data: any,
        options?: { omit?: string[] },
    ) {
        let { omit } = options || {};
        let body = {
            status: this.statusToMsg(STATUS_CODE.OK),
            data: omit.length ? Util.omit(data, omit) : data,
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.OK },
        });
    }

    public static badRequest(req: IRequest, res: IResponse, errors: any) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.BAD_REQUEST),
            errors: Array.isArray(errors) ? errors : [errors],
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.BAD_REQUEST },
        });
    }

    public static badRequestMsg(req: IRequest, res: IResponse, error: string) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.BAD_REQUEST),
            errMsg: error,
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.BAD_REQUEST },
        });
    }

    public static unauthorized(req: IRequest, res: IResponse, error: string | object) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.UNAUTHORIZED),
            error: error,
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.UNAUTHORIZED },
        });
    }

    public static forbidden(req: IRequest, res: IResponse, error: string | object) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.FORBIDDEN),
            error: error,
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.FORBIDDEN },
        });
    }

    public static tooManyRequests(req: IRequest, res: IResponse, error: string | object) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.TOO_MANY_REQUESTS),
            error: error,
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.TOO_MANY_REQUESTS },
        });
    }

    public static notFound(req: IRequest, res: IResponse) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.NOT_FOUND),
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.NOT_FOUND },
        });
    }

    public static unsupportedAction(req: IRequest, res: IResponse) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.UNSUPPORTED_ACTION),
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.UNSUPPORTED_ACTION },
        });
    }

    public static created(req: IRequest, res: IResponse) {
        this.jsonResponse({
            res,
            body: null,
            options: { status: STATUS_CODE.CREATED },
        });
    }

    public static invalid(req: IRequest, res: IResponse, errors: any) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.VALIDATION_FAILED),
            errors: Array.isArray(errors) ? errors : [errors],
        };

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.VALIDATION_FAILED },
        });
    }

    public static serverError(req: IRequest, res: IResponse, error: Error) {
        let body = {
            status: this.statusToMsg(STATUS_CODE.SERVER_ERROR),
            error: 'An error occurred',
        };

        // Save log server error
        const { hostname, originalUrl, method } = req;
        Log.error(
            `HOST: ${hostname} - PATH: ${originalUrl} - METHOD: ${method} - ERROR_MESSAGE: ${error.message} - STACKTRACE: ${error?.stack}`,
        );

        this.jsonResponse({
            res,
            body,
            options: { status: STATUS_CODE.SERVER_ERROR },
        });
    }
}

export default Resolve;
