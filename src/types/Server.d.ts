import { Request, Response, NextFunction } from 'express';

export interface DataStoredInToken {
    code: string;
    username: string;
}

export interface IRequest extends Request {}

export interface IResponse extends Response {}

export interface INextFunction extends NextFunction {}

export interface IRouterConfig {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    middlewares: any[];
    handlers: any;
}
