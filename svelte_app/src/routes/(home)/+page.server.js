process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validatio


import {devEnvironment} from '$lib/api/keys.js';

//For loadin the articles
export const load = async({fetch}) =>{
	let ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/?offset=100';
	let HEADERS = {
		method: 'GET',
	}
	let response = await fetch(ENDPOINT,HEADERS);
	console.log(ENDPOINT);
	let data = await response.json();

	let ENDPOINTUSER = devEnvironment.PUBLIC_SERVER_GATEWAY+'/session/all';
	let HEADERSUSER = {
		method: 'GET',
	}
	
	let responseUser = await fetch(ENDPOINTUSER,HEADERSUSER);
	let dataUser = await responseUser.json();
	
	if(data!=null){
	
	const articleUser = data.map( article => {
		const userMatch = dataUser.find(user => user.id == article.author_id);
		return {...article,author_name: userMatch.fullname,author_user: userMatch.login};
	});
	return {articles:articleUser}

	}
	
	return {articles:data}
	
	
}
