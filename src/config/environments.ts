import dotenv from 'dotenv';
dotenv.config();

enum Environment {
	BOT_TOKEN = 'BOT_TOKEN',
	MONGO_URL = 'MONGO_URL',
}

type TEnvironments = keyof typeof Environment;

const envs = {
	BOT_TOKEN: process.env.BOT_TOKEN,
	MONGO_URL: process.env.MONGO_URL,
};

export const environment = (key: TEnvironments) => {
	const env = envs[key];

	if (!env) throw new Error(`Please, set ${key} environment variable`);
	
	return env;
};
