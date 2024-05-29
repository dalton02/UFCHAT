"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            const options = { expiresIn: environment_1.devEnvironment.TOKEN_ACCESS_EXPIRES };
            resolve(jsonwebtoken_1.default.sign(payload, environment_1.devEnvironment.ACCESS_TOKEN_SECRET, options));
        });
    }
    generateRefreshToken(id) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: id,
            };
            const options = { expiresIn: environment_1.devEnvironment.TOKEN_REFRESH_EXPIRES };
            resolve(jsonwebtoken_1.default.sign(payload, environment_1.devEnvironment.REFRESH_TOKEN_SECRET, options));
        });
    }
    verifyToken(token, type) {
        return new Promise((resolve, reject) => {
            try {
                let key = environment_1.devEnvironment.ACCESS_TOKEN_SECRET;
                if (type == 1)
                    key = environment_1.devEnvironment.REFRESH_TOKEN_SECRET;
                const decoded = jsonwebtoken_1.default.verify(token, key);
                resolve({ expired: false, data: decoded });
            }
            catch (error) {
                resolve({ expired: true, data: error }); //Cannot be reject cause iwill throw erro too son
            }
        });
    }
}
exports.TokenController = TokenController;
