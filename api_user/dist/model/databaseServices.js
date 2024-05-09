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
exports.UserServices = void 0;
const type_1 = require("../types/type");
const databaseCon_1 = require("./databaseCon");
class UserServices {
    constructor() {
        this.addUser = (matricula, fullname, nickname, curso, login) => __awaiter(this, void 0, void 0, function* () {
            const student = yield this.students.create({
                id: matricula,
                nickname: nickname,
                fullname: fullname,
                course: curso,
                login: login
            });
        });
        this.checkUser = (matricula) => __awaiter(this, void 0, void 0, function* () {
            const student = yield this.students.findByPk(matricula);
            return student;
        });
        this.sequelize = new databaseCon_1.SequelizeConnection().seque;
        this.students = this.sequelize.define("students", type_1.StudentsAttributes);
    }
}
exports.UserServices = UserServices;
