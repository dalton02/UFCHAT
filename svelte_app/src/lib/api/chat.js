 
import {io} from 'socket.io-client';
import {devEnvironment} from '$lib/api/keys.js';
import {get} from 'svelte/store';
import {currentIdChat,chat} from '$lib/stores/chatStore.js';

const ENDPOINT = devEnvironment.PUBLIC_SERVER_SOCKET;
 
const SOCKET = io(ENDPOINT, {
	path: '/socket.io',
  	withCredentials: true,
});

let SESSION;

export const enterChat = async (sessionId) =>{
	SOCKET.on('connect',()=>{
    	console.log("You are connect in: ",SOCKET.id);
	});

	const value = get(chat);

		for(let i=0;i<value.length;i++){
			SOCKET.emit('join-room', value[i].details.id);		
		}
	SESSION = sessionId;
}

export const sendMessage = async(conversation_id,body) => {

	const mensagem = {
		conversation_id: conversation_id,
		body: body,
		sessionId: SESSION,
		send_at:  new Date(),
	};
    SOCKET.emit("send-message", mensagem);
}

export const receiveMessage = async() =>{

	SOCKET.on("receive-message",mensagem=>{

		const value = get(chat);
	
  		for(let i=0;i<value.length;i++){
  			if(value[i].details.id==mensagem.conversation_id){	
  				const formated = {
					conversation_id: mensagem.conversation_id,
					body: mensagem.body,
					sender_nick: mensagem.sender_nick,
					send_at: mensagem.send_at,
  				} 
  				let x = value;
  				x[i].messages.push(formated);
  				chat.set(x);
  			}
  		}

  	});

}


