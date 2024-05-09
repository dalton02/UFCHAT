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
class SequelizeConnection {
    constructor() {
        this.seque = new sequelize_1.Sequelize(process.env.SERVER_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            port: process.env.DB_PORT,
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
