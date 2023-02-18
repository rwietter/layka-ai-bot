import { bot } from '../http/http';
import { db } from '../database/db';
import { OPENAI_API_KEY_LENGTH } from '../constants/constants';
import { HttpReponseError } from '../@types';

const helpMsg = `Command reference:
/start - Start bot (mandatory in groups)
/set_key - Set your OpenAI API key
/update_key - Update your OpenAI API key
/delete_key - Delete your OpenAI API key
`;

bot.command('help', async (ctx) => {
	await ctx.telegram.sendMessage(ctx.chat.id, helpMsg);
});

bot.command('set', async (ctx) => {
	try {
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
	} catch (err) {
		const error = err as Error;
		console.log('SET KEY ERROR', error.message);
	}
});

bot.command('delete', async (ctx) => {
	try {
		const userId = ctx.from.id;

		const collection = db.collection('open_api_key');

		const exists = await collection.findOne({ user_id: userId });

		if (!exists)
			return ctx.telegram.sendMessage(ctx.chat.id, 'API key not found. Please use /set_key to set your API key.');

		const isDeleted = await collection.findOneAndDelete({ user_id: userId });

		if (isDeleted.ok) return ctx.telegram.sendMessage(ctx.chat.id, 'API key deleted successfully!');
		
		return ctx.telegram.sendMessage(ctx.chat.id, 'Error deleting API key. Please try again.');
	} catch (err) {
		const error = err as HttpReponseError;
		if (error.response) return console.log('DELETE KEY ERROR', error.response.data);
		console.log(error.message);
	}
});

bot.command('update', async (ctx) => {
	try {
		const [, apiKey] = ctx.message.text.split(' ');

		if (!apiKey)
			return ctx.telegram.sendMessage(ctx.chat.id, 'Please provide an API key. Example: /update_key sk-1234567890');
		
		if (apiKey.length !== OPENAI_API_KEY_LENGTH)
			return ctx.telegram.sendMessage(ctx.chat.id, 'Please provide a valid API key (51 characters)');
		
		const collection = db.collection('open_api_key');

		const exists = await collection.findOne({ user_id: ctx.from.id });

		if (!exists)
			return ctx.telegram.sendMessage(ctx.chat.id, 'API key not found. Please use /set_key to set your API key.');
		
		const isUpdated = await collection.findOneAndUpdate({
			user_id: ctx.from.id,
		}, {
			$set: {
				api_key: apiKey,
			},
		});

		if (isUpdated.ok) return ctx.telegram.sendMessage(ctx.chat.id, 'API key updated successfully!');

		return ctx.telegram.sendMessage(ctx.chat.id, 'Error updating API key. Please try again.');
	} catch (err) {
		const error = err as HttpReponseError;
		if (error.response) return console.log('UPDATE KEY ERROR', error.response.data);
		console.log(error.message);		
	}
});

bot.command('lang', async (ctx) => {
	try {
		const [, progLang] = ctx.message.text.split(' ');

		if (!progLang)
			return ctx.telegram.sendMessage(ctx.chat.id, 'Please provide a programming language. Example: /lang python');
		
		const collection = db.collection('prog_lang');

		const response = await collection.updateOne({ user_id: ctx.from.id }, {
			$set: {
				prog_lang: progLang.trim().toLowerCase(),
			},
		}, {
			upsert: true,
		});

		if (response.acknowledged)
			return ctx.telegram.sendMessage(ctx.chat.id, 'Programming language set successfully!');
		
		return ctx.telegram.sendMessage(ctx.chat.id, 'Error setting programming language. Please try again.');
	} catch (err) {
		const error = err as HttpReponseError;
		if (error.response) return console.log('SET PROG LANG ERROR', error.response.data);
		console.log(error.message);
	}
});
