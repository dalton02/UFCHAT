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
                const cookies = req.cookies;
                //Checando se token expirou
                const myAccess = yield tokenClass.verifyToken(cookies.accessToken);
                const myRefresh = yield tokenClass.verifyToken(cookies.refreshToken);
                if (myRefresh.expired === true) {
                    console.log("Cookies/Token expirados: ");
                    return res.status(404).json({ message: "Cookies/Token expirados" });
                }
                //Refresh Token ainda está vivo, fazemos requerimento para outro accesstoken
                const request = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                };
                let response = yield fetch(`http:localhost:4000/api/login/'${myRefresh.data.id}'`, request);
                if (!response.ok) {
                    console.log('\nUsuario não existe');
                    return res.status(404).json({ error: "User not found" });
                }
                let getData = yield response.json();
                const newAccessToken = yield tokenClass.generateAccessToken(getData.login, getData.fullname, getData.id, getData.nickname, getData.course);
                const newRefreshToken = yield tokenClass.generateRefreshToken(getData.id);
                res.cookie('accessToken', newAccessToken, { maxAge: 3600000, httpOnly: true, secure: true });
                res.cookie('refreshToken', newRefreshToken, { maxAge: 3600000, httpOnly: true, secure: true });
                const fowardData = yield tokenClass.verifyToken(newAccessToken);
                req.body = fowardData.data;
                next();
            }
            catch (err) {
                return res.status(401).json({ message: "Cookies/Token expirados" });
            }
        });
    }
}
exports.SecurityMiddle = SecurityMiddle;
