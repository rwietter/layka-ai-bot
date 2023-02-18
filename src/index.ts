import { bot } from './http/http';
import { setupRoutes } from './routes';
import express from 'express';

const app = express();

import './database/db';

setupRoutes();

app.use(bot.webhookCallback('/bot'));

if (process.env.NODE_ENV === 'production') {
	bot.telegram.setWebhook('https://layka.herokuapp.com/bot');
} else {
	bot.launch();
}

app.get('/', (req, res) => {
	res.send('Our new tab!!');
});

app.listen(8000, '0.0.0.0', () => {
	console.log(`Listen in the port ${8000}`);
});

bot.telegram.getWebhookInfo().then((info) => {
	console.log(info);
});
