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
exports.gatewayRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const multer_1 = __importDefault(require("multer"));
const tokenController_1 = require("../controller/tokenController");
const securityMiddle_1 = require("../middleware/securityMiddle");
const environment_1 = require("../types/environment");
const type_1 = require("../types/type");
const gatewayRouter = express_1.default.Router();
exports.gatewayRouter = gatewayRouter;
const tokenClass = new tokenController_1.TokenController();
const security = new securityMiddle_1.SecurityMiddle();
//gatewayRouter.use(security.verifyCookies);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
gatewayRouter.all("/:url/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url } = req.params;
    let api = (req.url).replace(/^\/[^\/]+/, '');
    console.log(req.body);
    if (!environment_1.ROUTES.some(route => route.url == url)) {
        console.log("Is no match");
        return res.status(404).send();
    }
    const route = environment_1.ROUTES.filter(route => route.url == url);
    try {
        let config = {
            method: req.method,
            url: `${route[0].target}${api}`,
            data: req.body,
            headers: {
                'Content-Type': req.headers['content-type']
            },
        };
        console.log(config);
        const response = yield axios_1.default.request(config);
        const getData = response.data;
        //Refatorar rotas multiplexadas depois...
        if (url == 'session' && api == '/login') {
            if (response.status == 201) {
                console.log("New user in production....");
                let newConfig = {
                    method: 'POST',
                    url: environment_1.ROUTES[1].target + "/addUserInChat",
                    data: {
                        userId: getData.id,
                        chatsId: type_1.generalChats,
                    }
                };
                yield axios_1.default.request(newConfig);
                console.log("All set to new user");
            }
            const newAccessToken = yield tokenClass.generateAccessToken(getData.login, getData.fullname, getData.id, getData.nickname, getData.course);
            const newRefreshToken = yield tokenClass.generateRefreshToken(getData.id);
            res.cookie("accessToken", newAccessToken, { maxAge: 99999999999, path: "/", httpOnly: true,
                secure: true, sameSite: "none" });
            res.cookie("refreshToken", newRefreshToken, { maxAge: 99999999999, path: "/",
                httpOnly: true, secure: true, sameSite: "none", });
            return res.status(response.status).json(getData);
        }
        console.log(getData);
        return res.status(response.status).json(getData);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
