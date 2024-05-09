"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketChat = void 0;
const admin_ui_1 = require("@socket.io/admin-ui");
const socket_io_1 = require("socket.io");
class SocketChat {
    constructor() {
        this.io = new socket_io_1.Server(4000, {
            cors: {
                origin: ['http://localhost:5173', 'https://admin.socket.io'],
                credentials: true,
            },
        });
    }
    open() {
        this.io.on("connection", (client) => {
            client.on("send-message", (mensagem) => {
                const { text, room, id } = mensagem;
                if (room == "")
                    this.io.emit("recive-message", mensagem);
                else
                    this.io.to(room).emit("recive-message", mensagem);
            });
            client.on("join-room", (room, callback) => {
                client.join(room);
                callback(`Você entrou na room ${room}`);
            });
        });
        (0, admin_ui_1.instrument)(this.io, { auth: false, mode: "development" });
    }
}
exports.SocketChat = SocketChat;
