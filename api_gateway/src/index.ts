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
  origin: [devEnvironment.SERVER_CLIENT,'http://localhost:7000','http://localhost:4173',
  'http://localhost:3000','http://0.0.0.0:3000'],
  credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiesParser());

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use('/session',sessionRouter);
app.use('/chat',chatRouter);


app.listen(devEnvironment.SERVER_PORT, ()=>{console.log("API GATEWAY is running in port ",devEnvironment.SERVER_PORT)});

