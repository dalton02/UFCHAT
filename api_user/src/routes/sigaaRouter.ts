// Importa o framework Express e tipos relacionados
import express, { Request, Response, Router } from 'express';
// Cria uma instância do aplicativo Express
const app = express();
// Cria um objeto Router do Express
const router = express.Router();

// Importa middleware de autenticação
import { checkForm } from '../middleware/authenticationMid';
// Importa o controlador de usuário
import { UserController } from '../controllers/userController';
// Importa os serviços de banco de dados de usuário
import { UserServices } from '../model/databaseServices';

// Cria instâncias do controlador de usuário e dos serviços de banco de dados
const userC = new UserController();
const userS = new UserServices();

// Rota POST para autenticar e adicionar usuários
router.post('/', checkForm, async (req: Request, res: Response) => {
    const { login, password } = req.body;

    try {
        console.log("User get REQUEST: ", req.body);
        // Obtém cookies do SIGAA
        const cookies = await userC.getCookiesFromSigaa();
        // Obtém a página do usuário do SIGAA
        const userPage = await userC.getInfoFromSigaa(login, password, cookies);
        // Extrai informações essenciais da página do usuário
        const data = await userC.getEssentialHtml(userPage);
        console.log("User return DATA: ", data);
        
        // Verifica se o usuário já existe no banco de dados
        const user = await userS.checkUser(data.id);
        
        // Se o usuário não existir, adiciona ao banco de dados
        if (user == null)
            await userS.addUser(data.id, data.fullname, login, data.course, login);
        
        // Retorna os detalhes do usuário
        res.status(200).json({ login: login, id: data.id, fullname: data.fullname, course: data.course, nickname: login });
    } catch (err) {
        // Retorna erro se a autenticação falhar
        res.status(404).json({ err: 'Usuário ou senha incorreto(s)' });
    }
});

// Rota GET para obter detalhes de um usuário por ID
router.get('/:id', checkForm, async (req: Request, res: Response) => {
    let id: string = req.params.id;
    id = id.replace(/'/g, ''); // Remove as aspas do ID
    const parsedId: number = parseInt(id, 10);

    try {
        // Verifica se o usuário existe no banco de dados
        const user = await userS.checkUser(parsedId);
        // Retorna os detalhes do usuário
        res.json({
            login: user.dataValues.login, id: user.dataValues.id, fullname: user.dataValues.fullname,
            course: user.dataValues.course, nickname: user.dataValues.nickname
        });
    } catch (err) {
        // Retorna erro se ocorrer um erro ao buscar o usuário no banco de dados
        res.json({ err: err });
    }
});

// Exporta o router
export { router };
