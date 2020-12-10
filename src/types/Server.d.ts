import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {
  // Define
}

export interface IResponse extends Response {
  // Define
}

export interface INextFunction extends NextFunction {
  // Define
}

export interface IRouterConfig {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  middlewares: any[];
  handlers: any;
}

export interface ILocals {
  port: string | number;
  host: string;
  appSecret: string;
  mongooseUrl: string;
  maxUploadLimit: string;
  maxParameterLimit: number;
  jwtExpiresIn: string | number;
  name: string;
  copyright: string;
  isCORSEnabled: boolean;
  apiPrefixV1: string;
  url: string;
}
