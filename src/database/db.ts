import { MongoClient } from 'mongodb';
import { environment } from '../config/environments';

const url = process.env.MONGO_URL || environment('MONGO_URL');

const getMongoSingletonInstance = () => {
	let instance: MongoClient;

	return () => {
		if (!instance) {
			instance = new MongoClient(url);
		}
		return instance;
	};
};

const mongo = getMongoSingletonInstance();
const client = mongo();

const initDatabase = async () => await client.connect();

export const db = client.db('layka');

initDatabase()
	.then(() => console.log('Connected successfully to database'))
	.catch((error) => {
		console.log('Error connecting to database', error.message);
		client.close();
	});
