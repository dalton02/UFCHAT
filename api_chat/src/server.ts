
import express from 'express';
import { SequelizeConnection } from './model/databaseCon';
import { ChatServices } from './model/databaseServices';
import {router} from './routes/chatDataRoute';

import {development} from './objects/environment';
export class ServerChat{

	private chat:any;
	private sequelize:any;
	private app:any;
	private cors:any;

	constructor(){
		this.sequelize = new SequelizeConnection();
		this.chat = new ChatServices(this.sequelize.seque);
		this.app = express();
		this.cors = require('cors');
		}

	startServer(){
		this.app.use(express.json());
		this.app.use(this.cors());
		this.app.listen(development.server_port, () => {
  		console.log(`listening on port `+development.server_port)
		})
	}

	handleRequests(){
	
		this.app.use('/api',router);
		

	}

}