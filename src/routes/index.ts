import { readdirSync } from 'fs';
import path from 'node:path';

/**
 * @description
 * This function will import all the routes and setup the routes
 */

const filename = path.basename(__filename);

const currentFile = (file: string) => file !== filename;

const addPriority = (file: string) => {
	return {
		file,
		priority: file.match(/messages/g) ? 0 : 1,
	};
};

type Priority = {
	priority: number;
};

const priority = (a: Priority, b: Priority) => b.priority - a.priority;

export const setupRoutes = () => {
	readdirSync(__dirname)
		.filter(currentFile)
		.map(addPriority)
		.sort(priority)
		.map(async ({ file }) => {
			return (await import(`./${file}`));
		});
};
