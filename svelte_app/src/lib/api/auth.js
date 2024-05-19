
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
	const response = await fetch(ENDPOINT, REQUEST);
	const json = await response.json();
	if(!response.ok){
		throw new Error({message:"Servidor fora do ar"});
	}
	if(respose.status==200 || respose.status==201)  localStorage.setItem("userNick",json.nickname);
	else	throw new Error({message:"Usuario/senha incorreto"});
	
}