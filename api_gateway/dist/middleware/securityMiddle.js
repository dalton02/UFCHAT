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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityMiddle = void 0;
const tokenController_1 = require("../controller/tokenController");
const tokenClass = new tokenController_1.TokenController();
class SecurityMiddle {
    constructor() {
        //Essa função é responsavel por verificar os cookies e atualizar o accessToken
        //Caso o refreshToken esteja expirado, o middleware retorna um erro
        this.verifyCookies = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.url);
                if (req.url == '/session/login') {
                    console.log("Hard pass");
                    return next();
                }
                const cookies = req.cookies;
                const myAccess = yield tokenClass.verifyToken(cookies.accessToken, 0);
                const myRefresh = yield tokenClass.verifyToken(cookies.refreshToken, 1);
                if (myRefresh.expired == true)
                    return res.status(404).json({ message: "Cookies/Token expirados" });
                const getData = myAccess.data;
                const newAccessToken = yield tokenClass.generateAccessToken(getData.login, getData.fullname, getData.id, getData.nickname, getData.course);
                const newRefreshToken = yield tokenClass.generateRefreshToken(getData.id);
                res.cookie('accessToken', newAccessToken, { maxAge: 99999999999, path: '/', httpOnly: true, secure: true, sameSite: 'none' });
                res.cookie('refreshToken', newRefreshToken, { maxAge: 99999999999, path: '/', httpOnly: true, secure: true, sameSite: 'none' });
                const fowardData = yield tokenClass.verifyToken(newAccessToken, 0);
                req.body = {
                    data: req.body,
                    cookies: fowardData.data
                };
                console.log("All good to past middleware");
                if (req.url == '/gateway/isAuth')
                    return res.status(200).send();
                return next();
            }
            catch (err) {
                console.log("Rejected");
                return res.status(404).json({ message: "Cookies/Token expirados" });
            }
        });
        this.seekInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            next();
        });
    }
}
exports.SecurityMiddle = SecurityMiddle;
