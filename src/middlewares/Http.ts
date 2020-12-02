import * as cors from 'cors';
import * as compress from 'compression';
import * as bodyParser from 'body-parser';
import * as session from 'cookie-session';

import { RES } from '../helps/Resolve';
import { Application } from 'express';

import Log from '../providers/Log';
import Locals from '../providers/Locals';

class Http {
    public static mount(_express: Application): Application {
        Log.info("Booting the 'HTTP' middleware...");

        // This check makes sure this is a JSON parsing issue, but it might be
        // coming from any middleware, not just body-parser:
        // Enables the request body parser
        _express.use((req, res, next) => {
            bodyParser.json({
                limit: Locals.config().maxUploadLimit,
            })(req, res, (err) => {
                if (err) RES.badRequest(req, res, 'Có lỗi xảy ra');
                next();
            });
        });

        _express.use((req, res, next) => {
            bodyParser.urlencoded({
                limit: Locals.config().maxUploadLimit,
                parameterLimit: Locals.config().maxParameterLimit,
                extended: false,
            })(req, res, (err) => {
                if (err) RES.badRequest(req, res, 'Có lỗi xảy ra');
                next();
            });
        });

        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        /**
         * Enables the session store
         *
         * Note: You can also add redis-store
         * into the options object.
         */
        const options = {
            resave: true,
            saveUninitialized: true,
            secret: Locals.config().appSecret,
            cookie: {
                maxAge: 86400000, // two days (in ms)
            },
        };

        _express.use(session(options));

        // Enables the CORS
        _express.use(cors());

        // Enables the "gzip" / "deflate" compression for response
        _express.use(compress());

        return _express;
    }
}

export default Http;
