import dotenv from 'dotenv';
dotenv.config();

enum Environment {
	BOT_TOKEN = 'BOT_TOKEN',
	OPENAI_API_KEY = 'OPENAI_API_KEY',
}

type TEnvironments = keyof typeof Environment;

const envs = {
	BOT_TOKEN: process.env.BOT_TOKEN,
	OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

export const environment = (key: TEnvironments) => {
	const env = envs[key];

	if (!env) throw new Error(`Please, set ${key} environment variable`);
	
	return env;
};
