import {InterfaceMessage} from '../objects/types';
import express, { Request, Response, NextFunction} from 'express';

export class ChatMiddle{

	constructor(){

	}

	rawCheck = async(req: Request,res: Response,next: NextFunction) => {
		let reqJson: InterfaceMessage;
		reqJson = req.body;
		if(reqJson.body=="" || reqJson.body.length==0){
			return res.send("Body vazio");
		}
		next();
	}

}