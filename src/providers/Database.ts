import * as mongoose from 'mongoose';

import { MongoError } from 'mongodb';

import Locals from '../providers/Locals';
import Log from './Log';

class Database {
    // Initialize your database pool
    public static init() {
        const dsn = Locals.config().mongooseUrl;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        mongoose.connect(dsn, options, (error: MongoError) => {
            // Handle the error case
            if (error) {
                Log.info('Failed to connect to the Mongo server!!');
                throw error;
            } else {
                Log.info('connected to mongo server');
                return console.log('\x1b[33m%s\x1b[0m', `Database :: Connected to @ '${dsn}'`);
            }
        });
    }
}

export default Database;
