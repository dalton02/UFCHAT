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
exports.ChatServices = void 0;
const types_1 = require("../objects/types");
class ChatServices {
    constructor(sequelize) {
        this.sendMessage = (conversation_id, body, sender_id, receiver_id, send_at) => __awaiter(this, void 0, void 0, function* () {
            const message1 = yield this.message.create({
                conversation_id: conversation_id,
                body: body,
                sender_id: sender_id,
                receiver_id: receiver_id,
                send_at: send_at
            });
        });
        this.findMessage = (id) => __awaiter(this, void 0, void 0, function* () {
            const message1 = yield this.message.findOne({ where: { id: `${id}` } });
            return message1;
        });
        this.createConversation = (conversation_name) => __awaiter(this, void 0, void 0, function* () {
            // Implementação do método createConversation
        });
        this.sequelize = sequelize;
        this.message = this.sequelize.define("messages", types_1.MessageAttributes);
        this.conversation = this.sequelize.define('conversations', types_1.ConversationAttributes);
        console.log(this.message);
    }
}
exports.ChatServices = ChatServices;
