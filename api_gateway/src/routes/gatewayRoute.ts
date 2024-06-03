import express, { Request, Response, NextFunction, Router } from "express";
import cookieParser from "cookie-parser";
import axios from "axios";
import multer from "multer";
import FormData from 'form-data';

import { TokenController } from "../controller/tokenController";
import { DataController } from '../controller/dataController';
import { SecurityMiddle } from "../middleware/securityMiddle";
import { ROUTES } from "../types/environment";
import { generalChats } from "../types/type";

const gatewayRouter = express.Router();
const tokenClass = new TokenController();
const security = new SecurityMiddle();
const dataClass = new DataController();

const storage = multer.memoryStorage(); // Armazena a imagem em memória temporariamente
const upload = multer({ storage: storage });


gatewayRouter.post("/:url/sendImage", upload.single('image'),async (req: Request, res: Response) => {
  const {url} = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const cookies = await security.getCookies(req);
    let formData = new FormData();
    const route = ROUTES.find(route => route.url == url);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    
    formData.append('image', Buffer.from(req.file.buffer), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    }); 
    formData.append('cookies', JSON.stringify(cookies)); 

    const response = await axios.post(route.target+'/sendImage', formData ,{
      headers: {
        ...formData.getHeaders()
      }
    });
    res.status(response.status).json(response.data);
  } 

  catch (error) {
    console.error('Error forwarding the image:', error);
    res.status(500).json({ message: 'Error forwarding the image' });
  }
  
});

gatewayRouter.get("/:url/*",async(req: Request,res: Response)=>{
    const {url} = req.params;
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

    const cookies = await security.getCookies(req);
    req.body = {
      data: req.body,
      cookies: cookies
    }
    console.log(req.body);
    const response = await dataClass.redirect(url,api,req,res) as any;
    const getData = response.data;
    console.log(getData);
    //Refatorar rotas multiplexadas depois...
    if(url=='session' && api=='/login'){

    	if(response.status==201){
        console.log("New user in production....");
        console.log(getData);
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

export default gatewayRouter;