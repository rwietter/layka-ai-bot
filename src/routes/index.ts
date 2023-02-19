import { readdirSync } from 'fs';
import path from 'node:path';

/**
 * @description
 * This function will import all the routes and setup the routes
 */

const filename = path.basename(__filename);

const ignoreCurrentFile = (file: string) => file !== filename;

const addPriority = (file: string) => {
	return {
		file,
		priority: file.match(/messages/g) ? 3 : file.match(/start/g) ? 1 : 2,
	};
};

const priority = (a: Priority, b: Priority) => a.priority - b.priority;

const importRoutes = async ({ file }: File) => (await import(`./${file}`));

export const setupRoutes = () => {
	readdirSync(__dirname)
		.filter(ignoreCurrentFile)
		.map(addPriority)
		.sort(priority)
		.map(importRoutes);
};

type File = { file: string; };
type Priority = { priority: number; };
