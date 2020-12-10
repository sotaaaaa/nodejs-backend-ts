import * as expressStatusMonitor from 'express-status-monitor';

import { Application } from 'express';

import Log from '../providers/Log';
import Locals from '../providers/Locals';

class StatusMonitor {
  public mount(_express: Application): Application {
    Log.info("Booting the 'StatusMonitor' middleware...");

    const apiPrefixV1 = Locals.config().apiPrefixV1;

    // Define your status monitor config
    const monitorOptions: object = {
      title: 'Status Server',
      path: `/${apiPrefixV1}/status-server`,
      spans: [
        {
          interval: 1, // Every second
          retention: 60, // Keep 60 data-points in memory
        },
        {
          interval: 5,
          retention: 60,
        },
        {
          interval: 15,
          retention: 60,
        },
      ],
      chartVisibility: {
        mem: true,
        rps: true,
        cpu: true,
        load: true,
        statusCodes: true,
        responseTime: true,
      },
      healthChecks: [
        {
          protocol: 'https',
          host: 'localhost',
          path: `/${apiPrefixV1}`,
          port: Locals.config().port,
        },
      ],
    };

    // Loads the express status monitor middleware
    _express.use(expressStatusMonitor(monitorOptions));

    return _express;
  }
}

export default new StatusMonitor();
