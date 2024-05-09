"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); //Generate Tokens
const environment_1 = require("../types/environment");
class TokenController {
    generateAccessToken(login, fullname, id, nickname, course) {
        return new Promise((resolve, reject) => {
            const payload = {
                login: login,
                fullname: fullname,
                id: id,
                nickname: nickname,
                course: course
            };
            const options = { expiresIn: environment_1.devEnvironment.TOKENACCESSEXPIRES };
            resolve(jsonwebtoken_1.default.sign(payload, environment_1.devEnvironment.TOKENSECRET, options));
        });
    }
    generateRefreshToken(id) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: id,
            };
            const options = { expiresIn: environment_1.devEnvironment.TOKENREFRESHEXPIRES };
            resolve(jsonwebtoken_1.default.sign(payload, environment_1.devEnvironment.TOKENSECRET, options));
        });
    }
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, environment_1.devEnvironment.TOKENSECRET);
                resolve({ expired: false, data: decoded });
            }
            catch (error) {
                reject({ expired: true, data: error });
            }
        });
    }
}
exports.TokenController = TokenController;
