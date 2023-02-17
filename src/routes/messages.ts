import { Message } from 'telegraf/typings/core/types/typegram';
import { db } from '../database/db';
import { bot } from '../http/http';
import { openai, paramenters } from '../config/openai';
import { HttpReponseError } from '../@types';

bot.on('message', async (ctx) => {
	try {
		const message = (ctx.message as Message.TextMessage).text;

		if (!message) return ctx.telegram.sendMessage(ctx.chat.id, 'Please, send me a message.');

		const collection = db.collection('open_api_key');
		const apiKey = await collection.findOne({ user_id: ctx.from.id });

		if(!apiKey) return ctx.telegram.sendMessage(ctx.chat.id, 'API key not found. Please use /set_key to set your API key.');

		try {
			const ai = openai(apiKey.api_key);

			const completion = await ai.createCompletion({
				...paramenters,
				prompt: message,
			});

			console.log('COMPLETION', completion.data.choices);
	
			const response = completion.data.choices[0].text;

			if(!response) return ctx.telegram.sendMessage(ctx.chat.id, 'Opss... I can\'t understand you.');

			return ctx.telegram.sendMessage(ctx.chat.id, response);
		} catch (err: unknown) {
			const error = err as HttpReponseError;
			if (error.response) {
				console.log('OPEN AI ERROR RESPONSE', error.response);
			} else {
				console.log('OPEN AI ERROR', error);
			}
		}
	} catch (err: unknown) {
		const error = err as HttpReponseError;
		console.log('MESSAGE ERROR', error.message);
	}
});
