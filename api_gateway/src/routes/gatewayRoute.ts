import express, { Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";
import axios from "axios";
import { TokenController } from "../controller/tokenController";

import { SecurityMiddle } from "../middleware/securityMiddle";
import { ROUTES } from "../types/environment";
import { generalChats } from "../types/type";

const gatewayRouter = express.Router();
const tokenClass = new TokenController();
const security = new SecurityMiddle();

gatewayRouter.all("/:url/:api",security.verifyCookies,async(req: Request,res: Response)=>{

	let {url,api} = req.params;

	if(!ROUTES.some(route=> route.url == url)){
		console.log("Is no match");
		return res.status(404).send();
	}

	const route = ROUTES.filter(route => route.url == url);

    try{
	let config = {
        method: req.method,
        url:  `${route[0].target}/${api}`,
        data: req.body
     };

    console.log(config);
    const response = await axios.request(config);
 	const getData = response.data;

    //Refatorar rotas multiplexadas depois...

    if(url=='session' && api=='login'){
    	if(response.status==201){
        console.log("New user in production....");
        config.url = route[0].target+"/api/addUserInChat";
        config.data = JSON.stringify({
            userId: getData.id,
            chatsId: generalChats,
        });
        await axios.request(config);
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

    return res.status(response.status).json(getData);
	
    }
	catch(err){
		return res.status(500).json(err);
	}
})

export {gatewayRouter};