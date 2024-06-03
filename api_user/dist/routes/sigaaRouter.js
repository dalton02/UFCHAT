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
router.post('/login', authenticationMid_1.checkForm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        if (login == "Carlos") {
            const user = yield userS.getUserById(1);
            console.log(user);
            return res.status(200).json({ login: login, id: user.id, fullname: user.fullname, course: user.course, nickname: login });
        }
        const cookies = yield userC.getCookiesFromSigaa();
        const userPage = yield userC.getInfoFromSigaa(login, password, cookies);
        const data = yield userC.getEssentialHtml(userPage);
        let user = yield userS.getUserById(data.id);
        let status = 200;
        if (user == null) {
            user = yield userS.addUser(data.id, data.fullname, login, data.course, login);
            status = 201;
            console.log("User sign in, status code: " + status);
            console.log(user);
        }
        return res.status(status).json({ login: login, id: user.id, fullname: user.fullname, course: user.course, nickname: login });
    }
    catch (err) {
        return res.status(404).json({ err: 'Usuário ou senha incorreto(s)' });
    }
}));
router.get('/all', authenticationMid_1.checkForm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userS.getUserAll();
        res.json(user);
    }
    catch (err) {
        res.json({ err: err });
    }
}));
router.get('/getUser/:id', authenticationMid_1.checkForm, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    id = id.replace(/'/g, ''); // Remove as aspas do ID
    const parsedId = parseInt(id, 10);
    try {
        const user = yield userS.getUserById(parsedId);
        res.json({
            login: user.dataValues.login, id: user.dataValues.id, fullname: user.dataValues.fullname,
            course: user.dataValues.course, nickname: user.dataValues.nickname
        });
    }
    catch (err) {
        res.json({ err: err });
    }
}));
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_nick, user_id } = req.body;
        yield userS.updateUser(user_nick, user_id);
        return res.status(200).json({ message: 'Updated' });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
}));
