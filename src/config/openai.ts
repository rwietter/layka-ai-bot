import { Configuration, OpenAIApi, type CreateCompletionRequest } from 'openai';

export const openai = (apiKey: string) => {
	const config = new Configuration({
		apiKey,
	});

	return new OpenAIApi(config);
};

type Paramenters = CreateCompletionRequest;

export const paramenters: Paramenters  = {
	top_p: 1,
	stop: '```',
	temperature: 0,
	suffix: '\n```',
	max_tokens: 1000,
	presence_penalty: 0,
	frequency_penalty: 0,
	model: 'text-davinci-003',
};
