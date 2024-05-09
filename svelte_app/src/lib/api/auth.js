
import {devEnvironment} from '$lib/api/keys.js';

export const loginStudent = async (login,password) =>{
    
	const ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+"/session/login";
	let headers = new Headers();

  	headers.append('Content-Type', 'application/json');
  	headers.append('Accept', 'application/json');

  	headers.append('Access-Control-Allow-Origin', '*');
  	headers.append('Access-Control-Allow-Credentials', 'true');

	const REQUEST = {
    	method: 'POST',
    	body: JSON.stringify({
       		"login": login,
    	    "password": password
    	}),
    	headers: headers,
  		credentials: 'include'
	};

	console.log(REQUEST);

	const response = await fetch(ENDPOINT, REQUEST);
	const json = await response.json();

	if(!response.ok){
		throw new Error(json.err);
	}
	console.log(json.message);
}