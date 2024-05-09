//this.app.use('/api/chat',router);
import express, { Request, Response, NextFunction ,Router } from 'express';
import axios from 'axios';


const app = express();
const chatRouter = express.Router();

import {TokenController} from '../controller/tokenController';
import {InterfaceUser,InterfaceToken} from '../types/type';
import {devEnvironment} from '../types/environment';
import {SecurityMiddle} from '../middleware/securityMiddle'

const tokenClass = new TokenController();
const security = new SecurityMiddle();


chatRouter.get('/',security.verifyCookies,async (req: Request,res: Response) =>{


	try{

    const cookies = req.cookies;		
	const data = await tokenClass.verifyToken(cookies.accessToken,0);
	const user_id = data.data.id
	
	let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: devEnvironment.SERVERCHATIP+'/'+user_id,
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    const response = await axios.request(config);
    let getData = response.data;
    getData = getData.data;
    res.status(200).json(getData);
	}
	catch(err){
        console.log(err);
		res.status(404).json({err: err});
	}
});



export {chatRouter};		