import { bot } from '../http/http';
import { db } from '../database/db';
import { OPENAI_API_KEY_LENGTH } from '../constants/constants';

const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/set_key - Set your OpenAI API key
/update_key - Update your OpenAI API key
/delete_key - Delete your OpenAI API key
`;

bot.command('help', async (ctx) => {
	await ctx.telegram.sendMessage(ctx.chat.id, helpMsg);
});

bot.command('set_key', async (ctx) => {
	const [, apiKey] = ctx.message.text.split(' ');

	if (!apiKey) 
		return await ctx.telegram.sendMessage(ctx.chat.id, 'Please provide an API key. Example: /set_key sk-1234567890');
	
	if (apiKey.length !== OPENAI_API_KEY_LENGTH) 
		return await ctx.telegram.sendMessage(ctx.chat.id, 'Please provide a valid API key (51 characters)');
	
	const collection = db.collection('open_api_key');
	
	const alreadyExists = await collection.findOne({ user_id: ctx.from.id });

	if (alreadyExists)
		return await ctx.telegram.sendMessage(ctx.chat.id, 'You already have an API key set. Please use /update_key to update it.');
	
	const response = await collection.insertOne({
		user_id: ctx.from.id,
		api_key: apiKey,
	});
	
	if (response.acknowledged)
		return ctx.telegram.sendMessage(ctx.chat.id, 'API key set successfully!');

	return ctx.telegram.sendMessage(ctx.chat.id, 'Error setting API key. Please try again.');
});
