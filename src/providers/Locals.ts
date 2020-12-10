import { Application } from 'express';
import { ILocals } from '../types/Server';

import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): ILocals {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const port = process.env.PORT || 8000;
    const host = process.env.HOST || 'localhost';
    const appSecret = process.env.APP_SECRET || 'secret';
    const mongooseUrl = process.env.MONGOOSE_URL;
    const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const url = `http://${host}:${port}`;

    const name = 'NodeJS BackEnd Typescript API Version 1.0';
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;

    const isCORSEnabled = true;
    const maxParameterLimit = 100;
    const apiPrefixV1 = process.env.API_PREFIX_V1;

    return {
      appSecret,
      apiPrefixV1,
      copyright,
      isCORSEnabled,
      jwtExpiresIn,
      maxUploadLimit,
      maxParameterLimit,
      mongooseUrl,
      name,
      port,
      host,
      url,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
