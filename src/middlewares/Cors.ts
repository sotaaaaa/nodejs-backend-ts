import * as cors from 'cors';

import { Application } from 'express';

import Log from '../providers/Log';
import Locals from '../providers/Locals';

class Cors {
  public mount(_express: Application): Application {
    Log.info("Booting the 'CORS' middleware...");

    const options = {
      origin: Locals.config().url,
      optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    };

    _express.use(cors(options));

    return _express;
  }
}

export default new Cors();
