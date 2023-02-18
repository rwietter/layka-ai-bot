import { bot } from './http/http';
import { setupRoutes } from './routes';

import './database/db';

setupRoutes();

if(process.env.environment == 'PRODUCTION'){
	bot.launch({
		webhook:{
			domain: 'https://layka.herokuapp.com/telegraf/3fc99407e2d79a3aa30901511a91c9b2b7bc7a60972ab7aa217dadf341b5',
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
