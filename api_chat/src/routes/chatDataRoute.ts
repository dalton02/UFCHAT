import express, { Request, Response, NextFunction ,Router } from 'express';
import { SequelizeConnection } from '../model/databaseCon';
import { ChatServices } from '../model/databaseServices';
import { ChatMiddle } from '../middleware/chatMiddle';

const sequelize = new SequelizeConnection();
const chat = new ChatServices(sequelize.seque);
const mid = new ChatMiddle();
const router: Router = express.Router();

router.get('/:user_id', async (req: Request, res: Response)=>{

	let {user_id} = req.params;
	user_id = user_id.replace(/'/g,'');
	const parsedId: number = parseInt(user_id, 10);
	
	try{
	const conversations = await chat.loadConversations(parsedId);
	let chunk: any = [];
	
	for(let i=0;i<conversations.length;i++){
		 let messages:any;
		 let chat_id = conversations[i].dataValues.chat_id; 
		 messages = await chat.loadChunk(chat_id);
		 let details = await chat.loadConversationDetails(chat_id);
		 details = details.dataValues;
		 const concatenar = {
		 	details,
		 	messages
		 };
		 chunk[i] = concatenar;
	}

	chunk = JSON.parse(JSON.stringify(chunk));
	console.log(chunk);
	res.status(200).json({data: chunk});
	}
	catch(err){
	res.status(404).json({err: err});
	}
	
});


export { router };

