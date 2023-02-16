import { type Context, Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { Update } from 'telegraf/typings/core/types/typegram';
dotenv.config();

const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/set_key - Set your OpenAI API key
/update_key - Update your OpenAI API key
/delete_key - Delete your OpenAI API key
`;

const requireToken = () => {
	const BOT_TOKEN = process.env.BOT_TOKEN;

	if (!BOT_TOKEN) {
		throw new Error('Please, set BOT_TOKEN environment variable');
	}

	return BOT_TOKEN;
};

const telegrafInstance = () => {
	const bot = new Telegraf(requireToken());

	return bot;
};

const bot: Telegraf<Context<Update>> = telegrafInstance();

bot.start((ctx) => {
	const msg = `Welcome, ${ctx.from.first_name}!`;
	const plz = 'Please, set your OpenAI API key using /set_key XXXX command.';
	const link = 'You can get it from https://platform.openai.com/account/api-keys';
	ctx.reply(`${msg}\n\n${plz}\n\n${link}`);
	ctx.reply('You can use /help to get a list of available commands');
});

bot.command('help', async (ctx) => {
	ctx.reply(helpMsg);
});

bot.on('message', (ctx) => {
	ctx.telegram.sendMessage(ctx.chat.id, 'Hello World');
});

bot.launch();
