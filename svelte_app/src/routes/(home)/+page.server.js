

import {devEnvironment} from '$lib/api/keys.js';

//For loadin the articles
export const load = async({fetch}) =>{
	let ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/?offset=0';
	let HEADERS = {
		method: 'GET',
	}
	console.log(ENDPOINT);
	let response = await fetch(ENDPOINT,HEADERS);
	let data = await response.json();
	
	return {articles:data}


}