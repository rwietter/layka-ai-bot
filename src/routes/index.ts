import { readdirSync } from 'fs';

export const setupRoutes = () => {
	readdirSync(__dirname).map(async (file) => {
		return file === 'index.ts' ? null : (await import(`./${file}`));
	});
};
