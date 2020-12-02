import * as express from 'express';

import { BaseRoutes } from '../routes/BaseRoute';

import Locals from '../providers/Locals';
import Kernel from '../middlewares/Kernel';

class Express {
    /**
     * Create the express object
     */
    public express: express.Application;

    /**
     * Initializes the express server
     */
    constructor() {
        this.express = express();
        this.mountDotEnv();
        this.mountMiddlewares();
        this.mountRoutes();
    }

    /**
     * Mounts env
     */
    private mountDotEnv(): void {
        this.express = Locals.init(this.express);
    }

    /**
     * Mounts all the defined middlewares
     */
    private mountMiddlewares(): void {
        this.express = Kernel.init(this.express);
    }

    /**
     * Mounts all the defined routes
     */
    private mountRoutes(): void {
        BaseRoutes.mountWeb(this.express);
        BaseRoutes.mountApi(this.express);
    }

    /**
     * Starts the express server
     */
    public init(): any {
        // Start the server on the specified port
        const port: number = Locals.config().port;
        this.express.listen(port, () => {
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ ${Locals.config().port}'`);
        });
    }
}

/** Export the express module */
export default new Express();
