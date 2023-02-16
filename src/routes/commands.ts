import { bot } from '../http/http';

const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/set_key - Set your OpenAI API key
/update_key - Update your OpenAI API key
/delete_key - Delete your OpenAI API key
`;

bot.command('help', async (ctx) => {
	ctx.reply(helpMsg);
});
