
import express, { Request, Response, NextFunction ,Router } from 'express';
import {devEnvironment} from '../types/environment';
import { ROUTES } from "../types/environment";
import axios from "axios";

export class DataController{

	redirect = async (url: string,api: string,req: Request,res: Response) =>{
	
	    if(!ROUTES.some(route=> route.url == url)){
			console.log("Is no match");
			return res.status(404).send();
		}

		const route = ROUTES.filter(route => route.url == url);

    	try{
			let config = {
        		method: req.method,
        		url:  `${route[0].target}${api}`,
        		data: req.body,
        		headers: {
            		'Content-Type': req.headers['content-type']
        		},
     		};
    	console.log(config);
    	let response = await axios.request(config);
 	   	return response;
		}
		catch(err){
			throw new Error;
		}
}
}

