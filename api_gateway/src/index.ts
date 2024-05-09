import express from 'express';
import cors from'cors';
import {scryptSync,randomBytes} from'crypto';
import jwt from'jsonwebtoken'; //Generate Tokens
import cookiesParser from'cookie-parser';
import {sessionRouter} from'./routes/sessionRoute';
import {chatRouter} from'./routes/chatRoute';
import {devEnvironment} from './types/environment';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173','http://localhost:3000','http://localhost:4173','http://0.0.0.0:3000'],
  credentials: true 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiesParser());

app.use('/session',sessionRouter);
app.use('/chat',chatRouter);


app.listen(devEnvironment.SERVERPORT, ()=>{console.log("API GATEWAY is running in port ",devEnvironment.SERVERPORT)});

