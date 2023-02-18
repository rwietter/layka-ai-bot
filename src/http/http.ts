import { Telegraf } from 'telegraf';
import { environment } from '../config/environments';

export const bot = new Telegraf(environment('BOT_TOKEN'));
