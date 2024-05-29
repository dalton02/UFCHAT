import express, { Request, Response, Router } from 'express';
const app = express();  
const router = express.Router();

import { checkForm } from '../middleware/authenticationMid';
import { UserController } from '../controllers/userController';
import { UserServices } from '../model/databaseServices';

const userC = new UserController();
const userS = new UserServices();

router.post('/login', checkForm, async (req: Request, res: Response) => {

    const { login, password } = req.body;
    try {
        const cookies = await userC.getCookiesFromSigaa();
        const userPage = await userC.getInfoFromSigaa(login, password, cookies);
        const data = await userC.getEssentialHtml(userPage);
        const user = await userS.getUserById(data.id);
        
        let status = 200;
        
        if (user == null){
            await userS.addUser(data.id, data.fullname, login, data.course, login);
            status = 201;
            console.log("User sign in, status code: "+status);
        }
        res.status(status).json({ login: login, id: data.id, fullname: data.fullname, course: data.course, nickname: login });
    } catch (err) {
        res.status(404).json({ err: 'Usuário ou senha incorreto(s)' });
    }
});

router.get('/all', checkForm, async (req: Request, res: Response) => {
    try {
       const user = await userS.getUserAll();
        res.json(user);
    } catch (err) {
        res.json({ err: err });
    }
});

router.get('/getUser/:id', checkForm, async (req: Request, res: Response) => {
    let id: string = req.params.id;
    id = id.replace(/'/g, ''); // Remove as aspas do ID
    const parsedId: number = parseInt(id, 10);

    try {
     
        const user = await userS.getUserById(parsedId);
     
        res.json({
            login: user.dataValues.login, id: user.dataValues.id, fullname: user.dataValues.fullname,
            course: user.dataValues.course, nickname: user.dataValues.nickname
        });
    } catch (err) {
        res.json({ err: err });
    }
});

router.put("/update", async (req: Request, res: Response) => {

    try{
        const {user_nick,user_id} = req.body; 
        await userS.updateUser(user_nick,user_id);
        return res.status(200).json({message:'Updated'});
    }
    catch(err){
        return res.status(500).json({message:err});
    }

});

export { router };
