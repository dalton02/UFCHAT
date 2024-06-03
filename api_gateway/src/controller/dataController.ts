
import express, { Request, Response, NextFunction ,Router } from 'express';
import {devEnvironment} from '../types/environment';
import { ROUTES } from "../types/environment";
import axios from "axios";

export class DataController{

	redirect = async (url: string,api: string,req: Request,res: Response) =>{
		console.log(url);
	    if(!ROUTES.some(route=> route.url == url)){
			console.log("Is no match");
			throw new Error;
		}

		const route = ROUTES.find(route => route.url == url);

    	try{
			let config = {
        		method: req.method,
        		url:  `${route!.target}${api}`,
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

