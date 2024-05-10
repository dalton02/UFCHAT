import express, { Request, Response, NextFunction ,Router } from 'express';
import cookieParser  from 'cookie-parser';

import axios from 'axios';

const app = express();
app.use(cookieParser());
const sessionRouter = express.Router();

import {TokenController} from '../controller/tokenController';
import {InterfaceUser,InterfaceToken} from '../types/type';
import {devEnvironment} from '../types/environment';
import {SecurityMiddle} from '../middleware/securityMiddle'

const tokenClass = new TokenController();
const security = new SecurityMiddle();


sessionRouter.post('/login',async (req: Request,res: Response) =>{
	
	try {
    
    const {login, password} = req.body;
    
    let data = JSON.stringify({
        "login": login,
        "password": password
    });

    //Configurar ips ao hostear com caddy
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: devEnvironment.SERVERUSERIP,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };

    const response = await axios.request(config);
    
    const getData = response.data as InterfaceUser;

    if (response.status !== 200) return res.status(response.status).json(getData);
	
    const newAccessToken = await tokenClass.generateAccessToken(getData.login,getData.fullname,getData.id,getData.nickname,getData.course);
    const newRefreshToken = await tokenClass.generateRefreshToken(getData.id);
    
    res.cookie('accessToken',newAccessToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:false});
	res.cookie('refreshToken',newRefreshToken,{maxAge:99999999999,path:'/',httpOnly:true,secure:false});

    return res.status(response.status).json({message:"Login bem sucedido",nickname: getData.nickname});
	} 

    //Pega erros do backend aqui
    catch (err) {
        return res.status(500).json({ message: `Erro na API GATEWAY '${err}'`});
    }

});


export {sessionRouter};