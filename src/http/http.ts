import { Telegraf } from 'telegraf';
import { botToken } from '../config/environments';

const telegrafInstance = () => {
	const bot = new Telegraf(botToken());

	return bot;
};

export const bot = telegrafInstance();
