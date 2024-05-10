
//Este import fetch é importante para um cacete, nunca apaguem
export const load = async({fetch}) =>{

	const ENDPOINT = ["http://localhost:4000/chat/","http://localhost:4000/chat/session/"];
	let headers = new Headers();

  	headers.append('Content-Type', 'application/json');
  	headers.append('Accept', 'application/json');

  	headers.append('Access-Control-Allow-Origin', '*');
  	headers.append('Access-Control-Allow-Credentials', 'true');

	const REQUEST = {
    	method: 'GET',
    	headers: headers,
  		credentials: 'include'
	};

	const response = await fetch(ENDPOINT[0], REQUEST);
	const json = await response.json();

	const responseSession = await fetch(ENDPOINT[1], REQUEST);
	const jsonSession = await responseSession.json();
	
	return {
		chat: json,
		session: jsonSession
	};


}