
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validatio
import {devEnvironment} from '$lib/api/keys.js';

export const load = async({fetch}) =>{


	const ENDPOINT = [`${devEnvironment.PUBLIC_SERVER_GATEWAY}/chat/getChunk/`,`${devEnvironment.PUBLIC_SERVER_GATEWAY}/chat/join`];
	let headers = new Headers();
	
	const REQUEST = {
    	method: 'POST',
    	headers: headers,
  		credentials: 'include'
	};

	const response = await fetch(ENDPOINT[0], REQUEST);
	const json = await response.json();
	console.log(json);
	const responseSession = await fetch(ENDPOINT[1], REQUEST);
	const jsonSession = await responseSession.json();
	console.log(json.data);
	if(json.data==null){
		throw new Error();
	}

	return {
		chat: json.data,
		session: jsonSession
	};


}