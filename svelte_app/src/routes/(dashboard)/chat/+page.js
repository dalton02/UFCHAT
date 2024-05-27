
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validation


import {devEnvironment} from '$lib/api/keys.js';

export const load = async({fetch}) =>{


	const ENDPOINT = [`${devEnvironment.PUBLIC_SERVER_GATEWAY}/chat/`,`${devEnvironment.PUBLIC_SERVER_GATEWAY}/chat/session/`];
	let headers = new Headers();
	
	const REQUEST = {
    	method: 'GET',
    	headers: headers,
  		credentials: 'include'
	};

	const response = await fetch(ENDPOINT[0], REQUEST);
	const json = await response.json();
	console.log(json);
	const responseSession = await fetch(ENDPOINT[1], REQUEST);
	const jsonSession = await responseSession.json();
	
	console.log(jsonSession);
	return {
		chat: json,
		session: jsonSession
	};


}