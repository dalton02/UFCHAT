"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const sessionRouter = express_1.default.Router();
exports.sessionRouter = sessionRouter;
const tokenController_1 = require("../controller/tokenController");
const securityMiddle_1 = require("../middleware/securityMiddle");
const tokenClass = new tokenController_1.TokenController();
const security = new securityMiddle_1.SecurityMiddle();
//Toda rota exceto a de login precisa do uso deste middleware para fazer o tratamento de dados
//Toda rota vai receber exatamente o conteudo do token {login,id,nickname,login} 
sessionRouter.get('/', security.verifyCookies, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.body);
}));
sessionRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: login, password: password })
        };
        const response = yield fetch(`http://localhost:4000/api/login`, request);
        const getData = yield response.json(); //Quando feito o login obtenho meus dados
        //Caso encontre erro em qualquer parte da requisição ele já cancela
        if (!response.ok)
            return res.status(response.status).json(getData);
        const newAccessToken = yield tokenClass.generateAccessToken(getData.login, getData.fullname, getData.id, getData.nickname, getData.course);
        const newRefreshToken = yield tokenClass.generateRefreshToken(getData.id);
        res.cookie('accessToken', newAccessToken, { maxAge: 3600000, httpOnly: true, secure: true });
        res.cookie('refreshToken', newRefreshToken, { maxAge: 3600000, httpOnly: true, secure: true });
        return res.status(response.status).json({ message: "Login bem sucedido" });
    }
    //Pega erros do backend aqui
    catch (err) {
        return res.status(500).json({ message: `Erro na API GATEWAY '${err}'` });
    }
}));
