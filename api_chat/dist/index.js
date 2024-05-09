"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("./server");
const socket_1 = require("./socket");
const server = new server_1.ServerChat();
server.startServer();
server.handleRequests();
const socket = new socket_1.SocketChat();
socket.open();
