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
	temperature: 0.7,
	max_tokens: 256,
	best_of: 1,
	model: 'text-davinci-003',
};
