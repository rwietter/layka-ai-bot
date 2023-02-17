import { bot } from './http/http';
import { setupRoutes } from './routes';

import './database/db';

setupRoutes();
bot.launch();
