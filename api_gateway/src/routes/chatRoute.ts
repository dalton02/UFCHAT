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
	const token = await tokenClass.verifyToken(cookies.accessToken,0);
	const user_id = token.data.id
	
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


chatRouter.get('/session',security.verifyCookies,async (req: Request,res: Response)=>{

    try{    

        const cookies = req.cookies;        
        const token = await tokenClass.verifyToken(cookies.accessToken,0);

        let data = JSON.stringify({
            "userId": token.data.id,
            "userNick": token.data.nickname
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: devEnvironment.SERVERCHATIP+'/',
            headers: { 
             'Content-Type': 'application/json'
            },
            data : data
        };

        const response = await axios.request(config);
        const getData = response.data as {message:string,sessionId:number};
        return res.json(getData);
    }
    catch(err){
        return res.json({message:err});
    }

});
export {chatRouter};		