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
exports.SequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = require("../types/environment");
class SequelizeConnection {
    constructor() {
        this.seque = new sequelize_1.Sequelize(environment_1.development.database, environment_1.development.username, environment_1.development.password, {
            host: environment_1.development.host,
            dialect: 'postgres',
            port: environment_1.development.port,
            define: {
                timestamps: false // Remove colunas chatas
            },
        });
        this.auth();
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.seque.authenticate();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
            }
        });
    }
}
exports.SequelizeConnection = SequelizeConnection;
