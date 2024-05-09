"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsAttributes = void 0;
const sequelize_1 = require("sequelize");
exports.StudentsAttributes = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        allowNull: false
    },
    course: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        allowNull: false
    },
    login: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        allowNull: false
    }
};
