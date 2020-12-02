import { Application } from 'express';

import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
    /**
     * Makes env configs available for your app
     * throughout the app's runtime
     */
    public static config(): any {
        dotenv.config({ path: path.join(__dirname, '../../.env') });

        const port = process.env.PORT || 8000;
        const host = process.env.HOST || 'localhost';
        const appSecret = process.env.APP_SECRET || 'secret';
        const mongooseUrl = process.env.MONGOOSE_URL;
        const maxUploadLimit = process.env.APP_MAX_UPLOAD_LIMIT || '50mb';
        const maxParameterLimit = process.env.APP_MAX_PARAMETER_LIMIT || 100;

        const name = 'NodeJS-BackEnd-Typescript';
        const year = new Date().getFullYear();
        const copyright = `Copyright ${year} ${name} | All Rights Reserved`;

        const isCORSEnabled = true;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
        const apiPrefix = process.env.API_PREFIX || 'api';
        const apiVersion = process.env.API_VERSION || 'v1';

        return {
            appSecret,
            apiPrefix,
            copyright,
            isCORSEnabled,
            jwtExpiresIn,
            maxUploadLimit,
            maxParameterLimit,
            mongooseUrl,
            apiVersion,
            name,
            port,
            host,
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
