import express, { Request, Response, NextFunction ,Router } from 'express';
import {TokenController} from '../controller/tokenController';
import {InterfaceUser,InterfaceToken} from '../types/type';

const tokenClass = new TokenController();

export class SecurityMiddle{
	
	//Essa função é responsavel por verificar os cookies e atualizar o accessToken
	//Caso o refreshToken esteja expirado, o middleware retorna um erro

	getCookies = async(req:Request) =>{
		const cookies = req.cookies;
    	let fowardData = await tokenClass.verifyToken(cookies.accessToken,0) as {expired: boolean; data: any};
		return (fowardData.data);	
	}

	verifyCookies = async (req: Request,res: Response,next: NextFunction) => {

		try{
	

		if(req.url=='/session/login') return next();
		
		const cookies = req.cookies;
    	const myAccess = await tokenClass.verifyToken(cookies.accessToken,0);
		const myRefresh = await tokenClass.verifyToken(cookies.refreshToken,1);
		
		if(myRefresh.expired==true)   return res.status(404).json({message:"Cookies/Token expirados"});
		
		const getData = myAccess.data;
		const newAccessToken = await tokenClass.generateAccessToken(getData.login,getData.fullname,getData.id,getData.nickname,getData.course);
    	const newRefreshToken = await tokenClass.generateRefreshToken(getData.id);

		res.cookie('accessToken',newAccessToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:true,sameSite:'none'});
		res.cookie('refreshToken',newRefreshToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:true,sameSite:'none'});
	    
		if(req.url =='/gateway/isAuth')	return res.status(200).send();	

		return next();
		
		
		}
		
		catch(err){
			console.log("Rejected",err);
			return res.status(404).json({message:"Cookies/Token expirados"});	
		}

	}


}