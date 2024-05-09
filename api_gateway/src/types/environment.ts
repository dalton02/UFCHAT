
import * as dotenv from "dotenv";
import path from 'path';
const envPath = path.resolve(__dirname, '../../.env'); 
dotenv.config({path: envPath});

export const devEnvironment = {
		ACCESSTOKENSECRET: process.env.ACCESSTOKENSECRET ?? '',
		REFRESHTOKENSECRET: process.env.REFRESHTOKENSECRET ?? '',
		SERVERPORT: process.env.SERVERPORT ?? 0,
		TOKENACCESSEXPIRES: process.env.TOKENACCESSEXPIRES ?? '10m',
		TOKENREFRESHEXPIRES: process.env.TOKENREFRESHEXPIRES ?? '1h',
		SERVERUSERIP: process.env.SERVERUSERIP,
		SERVERCHATIP: process.env.SERVERCHATIP
}