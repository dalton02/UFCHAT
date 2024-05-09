"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerChat = void 0;
const express_1 = __importDefault(require("express"));
const databaseCon_1 = require("./model/databaseCon");
const databaseServices_1 = require("./model/databaseServices");
const chatDataRoute_1 = require("./routes/chatDataRoute");
class ServerChat {
    constructor() {
        this.sequelize = new databaseCon_1.SequelizeConnection();
        this.chat = new databaseServices_1.ChatServices(this.sequelize.seque);
        this.app = (0, express_1.default)();
        this.cors = require('cors');
    }
    startServer() {
        this.app.use(express_1.default.json());
        this.app.use(this.cors({ credentials: true, origin: 'http://localhost:5173' }));
        this.app.listen(5000, () => {
            console.log(`listening on port 5000`);
        });
    }
    handleRequests() {
        this.app.use('/api/chat', chatDataRoute_1.router);
    }
}
exports.ServerChat = ServerChat;
