import {SocketChat} from './socket';
import {ServerChat} from './server';
const socket = new SocketChat();
socket.open();

const server = new ServerChat();
server.startServer();
server.handleRequests();