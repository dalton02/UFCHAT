import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';
import { SequelizeConnection } from './model/databaseCon';
import { ChatServices } from './model/databaseServices';
import {development} from './objects/environment';
import {sessionInstance} from './session';

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
    			const instance = sessionInstance.get(mensagem.sessionId);
    			if(!instance) return false;
    			this.chat.sendMessage(mensagem.conversation_id,mensagem.body,instance.userNick,instance.userId,mensagem.send_at);	
    			
    			//Enviamos mensagem formatada, não enviamos o id do usuario no socket
    			const newMessage = {
					conversation_id: mensagem.conversation_id,
					body: mensagem.body,
					sender_nick: instance.userNick,
					send_at: mensagem.send_at,
  				} 

    			this.io.to(mensagem.conversation_id).emit("receive-message",newMessage);
    		
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
