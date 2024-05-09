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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
exports.router = router;
const authenticationMid_1 = require("../middleware/authenticationMid");
const userController_1 = require("../controllers/userController");
const databaseServices_1 = require("../model/databaseServices");
const userC = new userController_1.UserController();
const userS = new databaseServices_1.UserServices();
router.post('/', authenticationMid_1.checkForm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        //Retriving and selecting data from Sigaa WebSite
        const cookies = yield userC.getCookiesFromSigaa(); //Gets Cookie from the main page of Sigaa
        const userPage = yield userC.getInfoFromSigaa(login, password, cookies); //Login the users and retrives HTML page
        const data = yield userC.getEssentialHtml(userPage); //Get just the user data from the page
        //Manipulating database now
        const user = yield userS.checkUser(data.id);
        if (user == null)
            yield userS.addUser(data.id, data.fullname, login, data.course, login);
        res.status(200).json({ login: login, id: data.id, fullname: data.fullname, course: data.course, nickname: login });
    }
    catch (err) {
        res.status(404).json({ err: 'Usuário ou senha incorreto(s)' });
    }
}));
router.get('/:id', authenticationMid_1.checkForm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = id.replace(/'/g, ''); // Importante remover as aspas do id
    const parsedId = parseInt(id, 10);
    try {
        const user = yield userS.checkUser(parsedId);
        res.json({ login: user.dataValues.login, id: user.dataValues.id, fullname: user.dataValues.fullname,
            course: user.dataValues.course, nickname: user.dataValues.nickname
        });
    }
    catch (err) {
        res.json({ err: err });
    }
}));
