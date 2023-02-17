import { Telegraf } from 'telegraf';
import { environment } from '../config/environments';

const telegrafInstance = () => {
	const bot = new Telegraf(environment('BOT_TOKEN'));

	return bot;
};

export const bot = telegrafInstance();
