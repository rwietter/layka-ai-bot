import { log } from '../helpers/log';
import { bot } from '../http/http';

bot.on('message', (ctx) => {
	log(ctx);
	ctx.telegram.sendMessage(ctx.chat.id, 'Hello World');
});
