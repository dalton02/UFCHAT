import express, { Request, Response, NextFunction ,Router } from 'express';
import { SequelizeConnection } from '../model/databaseCon';
import { ChatServices } from '../model/databaseServices';
import { ChatMiddle } from '../middleware/chatMiddle';
import {sessionInstance} from '../session';
const sequelize = new SequelizeConnection();
const chat = new ChatServices(sequelize.seque);
const mid = new ChatMiddle();
const router: Router = express.Router();


router.post('/',async(req: Request,res:Response)=>{

	let {userId,userNick} = req.body;
	
	try{
		const sessionId = sessionInstance.enter(userId,userNick);
		return res.status(200).json({message:"Session entered",sessionId: sessionId});
	}
	catch(err){
		console.log(err);
		return res.json({message:err});
	}

});

router.get('/:userId', async (req: Request, res: Response)=>{

	let {userId} = req.params;
	userId = userId.replace(/'/g,'');
	const parsedId: number = parseInt(userId, 10);
	
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
	res.status(200).json({data: chunk});
	}
	catch(err){
	res.status(404).json({err: err});
	}
	
});


export { router };

