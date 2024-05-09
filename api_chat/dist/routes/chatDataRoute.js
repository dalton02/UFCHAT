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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const databaseCon_1 = require("../model/databaseCon");
const databaseServices_1 = require("../model/databaseServices");
const chatMiddle_1 = require("../middleware/chatMiddle");
const sequelize = new databaseCon_1.SequelizeConnection();
const chat = new databaseServices_1.ChatServices(sequelize.seque);
const mid = new chatMiddle_1.ChatMiddle();
const router = express_1.default.Router();
exports.router = router;
router.post('/', mid.rawCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //If everything is correct after the middleware, then will direct be saved
    const { conversation_id, body, sender_id, receiver_id, send_at } = req.body;
    chat.sendMessage(conversation_id, body, sender_id, receiver_id, send_at);
    res.send("Mensagem salva no banco");
}));
