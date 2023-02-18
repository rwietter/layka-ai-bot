import { Configuration, OpenAIApi, type CreateCompletionRequest } from 'openai';

export const openai = (apiKey: string) => {
	const config = new Configuration({
		apiKey,
	});

	return new OpenAIApi(config);
};

type Paramenters = CreateCompletionRequest;

export const paramenters: Paramenters  = {
	model: 'code-davinci-002',
	stop: '```',
	temperature: 0,
	max_tokens: 1000,
	presence_penalty: 0,
	frequency_penalty: 0,
};
