
import * as dotenv from "dotenv";
import path from 'path';
const envPath = path.resolve(__dirname, '../../.env'); 
dotenv.config({path: envPath});

export const devEnvironment = {
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? '',
		REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? '',
		TOKEN_ACCESS_EXPIRES: '10m',
		TOKEN_REFRESH_EXPIRES: '1h',
		SERVER_PORT: process.env.SERVER_PORT ?? 0,
		SERVER_USER: process.env.SERVER_USER,
		SERVER_CHAT: process.env.SERVER_CHAT,
		SERVER_NEWS: process.env.SERVER_NEWS,
		SERVER_CLIENT: process.env.SERVER_CLIENT ?? ''
}

export const ROUTES = [
	{
		url: 'session',
		target: process.env.SERVER_USER,
	},
	{
		url: 'chat',
		target: process.env.SERVER_CHAT,
	},
	{
		url: 'news',
		target: process.env.SERVER_NEWS,
	}
]