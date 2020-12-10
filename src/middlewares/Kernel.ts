import { Application } from 'express';

import Cors from './Cors';
import Http from './Http';
import StatusMonitor from './StatusMonitor';
import Locals from '../providers/Locals';

class Kernel {
  public static init(_express: Application): Application {
    // Check if CORS is enabled
    if (Locals.config().isCORSEnabled) {
      // Mount CORS middleware
      _express = Cors.mount(_express);
    }

    // Mount express apis middleware
    _express = Http.mount(_express);

    // Mount status monitor middleware
    _express = StatusMonitor.mount(_express);
    return _express;
  }
}

export default Kernel;
