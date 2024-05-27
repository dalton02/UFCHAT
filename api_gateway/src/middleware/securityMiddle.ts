import express, { Request, Response, NextFunction ,Router } from 'express';
import {TokenController} from '../controller/tokenController';
import {InterfaceUser,InterfaceToken} from '../types/type';

const tokenClass = new TokenController();

export class SecurityMiddle{
	
	//Essa função é responsavel por verificar os cookies e atualizar o accessToken
	//Caso o refreshToken esteja expirado, o middleware retorna um erro

	verifyCookies = async (req: Request,res: Response,next: NextFunction) => {

		try{
		console.log(req.url);
		if(req.url=='/session/login'){
			console.log("Hard pass");
			return next();
		}

		const cookies = req.cookies;
    	//Checando se token expirou	
		const myAccess = await tokenClass.verifyToken(cookies.accessToken,0);
		const myRefresh = await tokenClass.verifyToken(cookies.refreshToken,1);
		
		if(myRefresh.expired===true)   return res.status(404).json({message:"Cookies/Token expirados"});
		
		const getData = myAccess.data;
		const newAccessToken = await tokenClass.generateAccessToken(getData.login,getData.fullname,getData.id,getData.nickname,getData.course);
    	const newRefreshToken = await tokenClass.generateRefreshToken(getData.id);

		res.cookie('accessToken',newAccessToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:true,sameSite:'none'});
		res.cookie('refreshToken',newRefreshToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:true,sameSite:'none'});
	    
		const fowardData = await tokenClass.verifyToken(newAccessToken,0) as {expired: boolean; data: any};
		req.body = {
			data: req.body,
			cookies: fowardData.data
		}
		
		console.log("All good to past middleware");
	
		if(req.url =='/gateway/isAuth')	return res.status(200).send();
		

		return next();
		
		
		}
		catch(err){
			console.log("Rejected");
			return res.status(404).json({message:"Cookies/Token expirados"});	
		}

	}

	seekInfo = async(req: Request, res: Response, next:NextFunction) =>{
		console.log(req.body);
		next();
	}

}