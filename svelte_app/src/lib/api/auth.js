
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
	if(response.status==200 || response.status==201)  localStorage.setItem("userNick",json.nickname);
	else	throw new Error({message:"Usuario/senha incorreto"});
	return response.status;
	
}


export const changeNickStudent = async (nick) =>{

	const ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+"/session/updateUser";
	let headers = new Headers();

  	headers.append('Content-Type', 'application/json');
  	headers.append('Accept', 'application/json');

  	headers.append('Access-Control-Allow-Origin', '*');
  	headers.append('Access-Control-Allow-Credentials', 'true');

	const REQUEST = {
    	method: 'PUT',
    	body: JSON.stringify({
       		"user_nick": nick
       	}),
    	headers: headers,
  		credentials: 'include'
	};

	const response = await fetch(ENDPOINT, REQUEST);
	const json = await response.json();
	return response;
}
export const submitImage = async(formData)=> {

        const response = await fetch(devEnvironment.PUBLIC_SERVER_GATEWAY+'/session/sendImage',{
        	method: 'POST',
            body: formData,
            credentials: 'include'
        })
        
        const json = await response.json();
        
        if(!response.ok){
        	console.log(json.Message);
        	return;
        }

}
