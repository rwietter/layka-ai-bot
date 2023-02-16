import { bot } from './http/http';
import { setupRoutes } from './routes';

setupRoutes();
bot.launch();
