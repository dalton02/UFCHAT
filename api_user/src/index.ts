import express from 'express';
import cors from 'cors';
import {router} from './routes/sigaaRouter';
import {development} from './types/environment';

const app = express();
app.use(express.json());

app.use(cors({
	origin: development.SERVER_GATEWAY,
}));


app.use('/',router);



app.listen( development.PORT, ()=> console.log('Running in port: ',development.PORT));
