"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationAttributes = exports.MessageAttributes = void 0;
const sequelize_1 = require("sequelize");
exports.MessageAttributes = {
    id: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: (0, sequelize_1.literal)('gen_random_uuid()'), // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        primaryKey: true
    },
    conversation_id: {
        type: sequelize_1.DataTypes.INTEGER, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
    },
    body: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        allowNull: false
    },
    sender_id: {
        type: sequelize_1.DataTypes.INTEGER, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
        allowNull: false
    },
    receiver_id: {
        type: sequelize_1.DataTypes.INTEGER, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
        allowNull: false
    },
    send_at: {
        type: sequelize_1.DataTypes.DATE, // Alterado para 'Date', pois 'DataTypes.DATE' não é acessível aqui diretamente
        allowNull: false
    },
};
exports.ConversationAttributes = {
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Alterado para 'number', pois 'DataTypes.INTEGER' não é acessível aqui diretamente
        primaryKey: true
    },
    conversation_name: {
        type: sequelize_1.DataTypes.STRING, // Alterado para 'string', pois 'DataTypes.STRING' não é acessível aqui diretamente
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE, // Alterado para 'Date', pois 'DataTypes.DATE' não é acessível aqui diretamente
        allowNull: false
    }
};
