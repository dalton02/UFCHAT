import express from 'express';
import cors from'cors';
import {scryptSync,randomBytes} from'crypto';
import jwt from'jsonwebtoken'; //Generate Tokens
import cookiesParser from'cookie-parser';
import {gatewayRouter} from'./routes/gatewayRoute';

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

app.use('/',gatewayRouter);


app.listen(devEnvironment.SERVER_PORT, ()=>{console.log("API GATEWAY is running in port ",devEnvironment.SERVER_PORT)});

