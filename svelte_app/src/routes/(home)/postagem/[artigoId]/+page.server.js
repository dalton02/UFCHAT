
import {devEnvironment} from '$lib/api/keys.js';



export const load = async ({fetch,params})=>{
	console.log(params);
	const title = params.artigoId.replace('-',' ');
	console.log(title);
	let ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/get?title='+title/////////;
	let HEADERS = {
		method: 'GET',
	}
	let response = await fetch(ENDPOINT,HEADERS);
	let data = await response.json();
	if(!response.ok){
		throw new Error();
	}

	let ENDPOINTUSER = devEnvironment.PUBLIC_SERVER_GATEWAY+'/session/all';
	let HEADERSUSER = {
		method: 'GET',
	}
	
	let responseUser = await fetch(ENDPOINTUSER,HEADERSUSER);
	let dataUser = await responseUser.json();

	


	const username = dataUser.find( user => user.id==data.author_id).nickname;
	data.author_name = username;	
	
	for(let i=0;i<data.comments.length;i++){
		data.comments[i].author_name = dataUser.find( user => user.id==data.comments[i].user_id).nickname;
	}

	const articleUser = data;



	return {article:articleUser}


}