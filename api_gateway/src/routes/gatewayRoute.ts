import express, { Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";
import axios from "axios";

import { TokenController } from "../controller/tokenController";
import { DataController } from '../controller/dataController';
import { SecurityMiddle } from "../middleware/securityMiddle";
import { ROUTES } from "../types/environment";
import { generalChats } from "../types/type";

const gatewayRouter = express.Router();
const tokenClass = new TokenController();
const security = new SecurityMiddle();
const dataClass = new DataController();

gatewayRouter.get("/:url/*",async(req: Request,res: Response)=>{
    let {url} = req.params;
    let api = (req.url).replace(/^\/[^\/]+/,'');
    try{
    const response = await dataClass.redirect(url,api,req,res) as any;
    const getData = response.data;
    console.log(getData);
    return res.status(response.status).json(getData);
    }
    catch(err){
        return res.status(500).json(err);
    }

});


gatewayRouter.all("/:url/*",security.verifyCookies,async(req: Request,res: Response)=>{

	let {url} = req.params;
    let api = (req.url).replace(/^\/[^\/]+/,'');

    try{
    const response = await dataClass.redirect(url,api,req,res) as any;
    const getData = response.data;
    console.log(getData);
    //Refatorar rotas multiplexadas depois...
    if(url=='session' && api=='/login'){
    	if(response.status==201){
        console.log("New user in production....");
        let newConfig = {
            method: 'POST',
            url: ROUTES[1].target+"/addUserInChat",
            data: {
                userId: getData.id,
                chatsId: generalChats,
            }
        };

        await axios.request(newConfig);
	    console.log("All set to new user");	
	}

    const newAccessToken = await tokenClass.generateAccessToken(getData.login,getData.fullname,
    getData.id,getData.nickname,getData.course);
    const newRefreshToken = await tokenClass.generateRefreshToken(getData.id);

    res.cookie("accessToken", newAccessToken, {maxAge: 99999999999,path: "/",httpOnly: true,
    secure: true,sameSite: "none"});

    res.cookie("refreshToken", newRefreshToken, {maxAge: 99999999999,path: "/",
    httpOnly: true,secure: true,sameSite: "none",});
        
    return res.status(response.status).json(getData);
	}
    
    console.log(getData);
    return res.status(response.status).json(getData);
	
    }
	catch(err){
		return res.status(500).json(err);
	}
});

export {gatewayRouter};