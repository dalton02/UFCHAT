
//Este import fetch é importante para um cacete, nunca apaguem
export const load = async({fetch}) =>{

	const ENDPOINT = "http://localhost:4000/chat/";
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

	const response = await fetch(ENDPOINT, REQUEST);
	const json = await response.json();
	
	return {

		chat: json
	
	};


}