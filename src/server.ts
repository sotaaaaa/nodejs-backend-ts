import APP from './providers/App';

// Clear all console
APP.clearConsole();

// Run the Database pool
APP.loadDatabase();

// Run the Server
APP.loadServer();
