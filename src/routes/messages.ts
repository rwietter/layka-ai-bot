import { sendMessage } from '../controllers/send.message';
import { bot } from '../http/http';

bot.on('message', (ctx) => {
	sendMessage(ctx, 'message');
});
