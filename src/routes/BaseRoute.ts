import { Router } from 'express';
import Locals from '../providers/Locals';

import HomeRouter from './v1/HomeRoute';

export class BaseRoutes {
    public static mountApiV1(__app: Router) {
        // Base url config
        const base = `/${Locals.config().apiPrefixV1}`;
        // Init all routes version 1.0
        __app.use(base + HomeRouter.route, new HomeRouter().router);
    }

    public static mountApiV2(__app: Router) {}
}
