import { bot } from './http/http';
import { setupRoutes } from './routes';

import './database/db';

setupRoutes();

if(process.env.NODE_ENV == 'production'){
	bot.launch({
		webhook:{
			domain: String(process.env.WEBHOOK_URL),
			port: 8000
		}
	}).then(() => {
		console.info('production', bot.botInfo);
	});
} else {
	bot.launch().then(() => {
		console.info('local', bot.botInfo);
	});
}

bot.telegram.getWebhookInfo().then((info) => {
	console.log(info);
});
