import type { Update } from 'telegraf/typings/core/types/typegram';
import type { Context } from 'telegraf';
import { db } from '../database';

type Next = {
	(): Promise<void>; (): void;
};

export const OpenAiKeyCheck = async (ctx: Context<Update>, next: Next) => {
	try {
		const collection = db.collection('open_api_key');
		const apiKey = await collection.findOne({ user_id: ctx?.from?.id });

		if (!apiKey) {
			return ctx.telegram.sendMessage(Number(ctx?.chat?.id), 'API key not found. Please use /set to set your API key.');
		}
	} catch (err) {
		const error = err as Error;
		console.log('Error', error.message);
	}
	next();
};
