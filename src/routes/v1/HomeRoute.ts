import { Router } from 'express';
import { RES } from '../../helps/Resolve';
import { IRequest, IResponse, IRouterConfig } from '../../types/Server';

import Locals from '../../providers/Locals';

export default class HomeRouter {
    public static route = '/';
    public router = Router();

    public routerConfig: IRouterConfig[] = [
        {
            method: 'get',
            path: '/',
            middlewares: [],
            handlers: this.goToHome,
        },
    ];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.routerConfig.map((router) => {
            this.router[router.method](
                router.path,
                router.middlewares,
                router.handlers,
            );
        });
    }

    private goToHome(req: IRequest, res: IResponse) {
        try {
            RES.ok(req, res, {
                name: Locals.config().name,
                version: 'v1',
            });
        } catch (error) {
            RES.serverError(req, res, error);
        }
    }
}
