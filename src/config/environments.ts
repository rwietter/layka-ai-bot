import dotenv from 'dotenv';
dotenv.config();

export const botToken = () => {
	const BOT_TOKEN = process.env.BOT_TOKEN;

	if (!BOT_TOKEN) {
		throw new Error('Please, set BOT_TOKEN environment variable');
	}

	return BOT_TOKEN;
};

export const openAIApiKey = () => {
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
	if(!OPENAI_API_KEY) {
		throw new Error('Please, set OPENAI_API_KEY environment variable');
	}
  
	return OPENAI_API_KEY;
};
