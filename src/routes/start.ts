import { bot } from '../http/http';

bot.start((ctx) => {
	const msg = `Welcome, ${ctx.from.first_name}!`;
	const plz = 'Please, set your OpenAI API key using /set_key XXXX command.';
	const link = 'You can get it from https://platform.openai.com/account/api-keys';
	ctx.reply(`${msg}\n\n${plz}\n\n${link}`);
	ctx.reply('You can use /help to get a list of available commands');
});
