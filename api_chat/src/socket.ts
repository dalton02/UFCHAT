import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';
import { SequelizeConnection } from './model/databaseCon';
import { ChatServices } from './model/databaseServices';
import {development} from './objects/environment';

export class SocketChat{

	private io:any;
	private chat:any;
	private sequelize:any;

	
	constructor(){
		this.io = new Server(development.socket_port, {
  		cors: {
    	origin: ['http://localhost:5173', 'https://admin.socket.io'],
    	credentials: true,
  		},
		});
		this.sequelize = new SequelizeConnection();
		this.chat = new ChatServices(this.sequelize.seque);

	}

	open(){

		this.io.on("connection",(client:any) =>{

  			client.on("send-message",(mensagem:any) =>{
    			
    			this.chat.sendMessage(mensagem.conversation_id,mensagem.body,mensagem.sender_nick,mensagem.sender_id,mensagem.send_at);
    			this.io.to(mensagem.conversation_id).emit("receive-message",mensagem);
    		
    		}
  		);

  			client.on("join-room", (room:any) =>{
    			client.join(room);
    			console.log("Joined");
  			});
		})
		
		instrument(this.io,{auth:false,mode: "development"});
	
	}



}
