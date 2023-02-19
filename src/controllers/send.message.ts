import type { Message, Update } from 'telegraf/typings/core/types/typegram';
import type { Context, NarrowedContext } from 'telegraf';
import { db } from '../database/db';
import { openai, paramenters } from '../config/openai';
import { HttpReponseError } from '../@types';

type Type = 'message' | 'send';

const sendMessage = async (ctx: NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>, type: Type) => {
	try {
		let message;

		if (type === 'send') {
			[, ...message] = (ctx.message as Message.TextMessage).text.split(' ');
			message = message.join(' ').toString();
		} else {
			message = (ctx.message as Message.TextMessage).text;
		}
		
		if (!message) return ctx.telegram.sendMessage(ctx.chat.id, 'Please, send me a message.');

		const keyCollection = db.collection('open_api_key');
		const apiKey = await keyCollection.findOne({ user_id: ctx.from.id }) || { api_key: ''};

		const langCollection = db.collection('prog_lang');
		const lang = await langCollection.findOne({ user_id: ctx.from.id });

		// if(!apiKey) return ctx.telegram.sendMessage(ctx.chat.id, 'API key not found. Please use /set_key to set your API key.');

		try {
			const ai = openai(apiKey.api_key);

			const backtick = '\n```';
			const highlight = `${backtick}${lang?.prog_lang || 'js'}`;
			const prompt = `${message.trim()}:${highlight}`;

			const completion = await ai.createCompletion({
				...paramenters,
				prompt,
			});

			const response = completion.data.choices[0].text;
			
			if(!response || !response.trim()) return ctx.telegram.sendMessage(ctx.chat.id, 'Opss... I can\'t understand you.');
			
			return ctx.telegram.sendMessage(ctx.chat.id, response);
		} catch (err: unknown) {
			const error = err as HttpReponseError;
			if (error.response) {
				console.log('OPEN AI ERROR RESPONSE', error.response.data);
				return ctx.telegram.sendMessage(ctx.chat.id, String(error.response.data.error.message));
			}
			console.log('OPEN AI ERROR', error);
		}
	} catch (err: unknown) {
		const error = err as HttpReponseError;
		console.log('MESSAGE ERROR', error.message);
	}
};

export { sendMessage };
