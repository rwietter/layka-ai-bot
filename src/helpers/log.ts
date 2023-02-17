import { Context, NarrowedContext } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

type Ctx = NarrowedContext<Context<Update>, Update.MessageUpdate<Message>>;

export const log = (ctx: Ctx) => {
	console.log(ctx.from);
};
