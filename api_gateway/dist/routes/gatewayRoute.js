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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const multer_1 = __importDefault(require("multer"));
const form_data_1 = __importDefault(require("form-data"));
const tokenController_1 = require("../controller/tokenController");
const dataController_1 = require("../controller/dataController");
const securityMiddle_1 = require("../middleware/securityMiddle");
const environment_1 = require("../types/environment");
const type_1 = require("../types/type");
const gatewayRouter = express_1.default.Router();
const tokenClass = new tokenController_1.TokenController();
const security = new securityMiddle_1.SecurityMiddle();
const dataClass = new dataController_1.DataController();
const storage = multer_1.default.memoryStorage(); // Armazena a imagem em memória temporariamente
const upload = (0, multer_1.default)({ storage: storage });
gatewayRouter.post("/:url/sendImage", upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.params;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const cookies = yield security.getCookies(req);
        let formData = new form_data_1.default();
        const route = environment_1.ROUTES.find(route => route.url == url);
        if (!route)
            return res.status(404).json({ message: 'Route not found' });
        formData.append('image', Buffer.from(req.file.buffer), {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
        });
        formData.append('cookies', JSON.stringify(cookies));
        const response = yield axios_1.default.post(route.target + '/sendImage', formData, {
            headers: Object.assign({}, formData.getHeaders())
        });
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.error('Error forwarding the image:', error);
        res.status(500).json({ message: 'Error forwarding the image' });
    }
}));
gatewayRouter.get("/:url/*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.params;
    let api = (req.url).replace(/^\/[^\/]+/, '');
    try {
        const response = yield dataClass.redirect(url, api, req, res);
        const getData = response.data;
        console.log(getData);
        return res.status(response.status).json(getData);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
gatewayRouter.all("/:url/*", security.verifyCookies, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { url } = req.params;
    let api = (req.url).replace(/^\/[^\/]+/, '');
    try {
        const cookies = yield security.getCookies(req);
        req.body = {
            data: req.body,
            cookies: cookies
        };
        console.log(req.body);
        const response = yield dataClass.redirect(url, api, req, res);
        const getData = response.data;
        console.log(getData);
        //Refatorar rotas multiplexadas depois...
        if (url == 'session' && api == '/login') {
            if (response.status == 201) {
                console.log("New user in production....");
                console.log(getData);
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
exports.default = gatewayRouter;
