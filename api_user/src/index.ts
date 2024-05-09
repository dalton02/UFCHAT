import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {router} from './routes/sigaaRouter';

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:4000','http://0.0.0.0:4000'],
  credentials: true 
};
app.use(cors(corsOptions));

dotenv.config();


app.use('/api/login',router);
//app.use('/api/db');



app.listen( process.env.PORT, ()=> console.log('Running in port: ',process.env.PORT));
