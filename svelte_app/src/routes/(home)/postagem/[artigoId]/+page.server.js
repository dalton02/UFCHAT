process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disable SSL certificate validatio

import {devEnvironment} from '$lib/api/keys.js';

export const load = async ({fetch,params})=>{

	const title = params.artigoId.replace('-',' ');
	let ENDPOINT = devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/get?title='+title/////////;
	let HEADERS = {
		method: 'GET',
	}
	let response = await fetch(ENDPOINT,HEADERS);
	let dataArticle = await response.json();
	if(!response.ok){
		throw new Error();
	}

	let ENDPOINTUSER = devEnvironment.PUBLIC_SERVER_GATEWAY+'/session/all';
	let HEADERSUSER = {
		method: 'GET',
	}
	
	let responseUser = await fetch(ENDPOINTUSER,HEADERSUSER);
	let dataUser = await responseUser.json();

	const fullname = dataUser.find( user => user.id==dataArticle.author_id).fullname;
	const user = dataUser.find( user => user.id==dataArticle.author_id).login;
	dataArticle.author_name = fullname;	
	dataArticle.author_user = user;
	
	for(let i=0;i<dataArticle.comments.length;i++){
		const userComment = dataUser.find( user => user.id==dataArticle.comments[i].user_id);
		dataArticle.comments[i].author_name = userComment.fullname;
		dataArticle.comments[i].author_user = userComment.login;
	}

	for(let i=0;i<dataArticle.comments.length;i++){
		let childs = dataArticle.comments.filter(
		comment => comment.parent_comment==dataArticle.comments[i].id);
		if (typeof childs !== 'undefined')	dataArticle.comments[i].childs = childs;
	}

	dataArticle.comments = dataArticle.comments.filter(
		comment => comment.parent_comment == 0
	);

	let ENDPOINTSTATUS = devEnvironment.PUBLIC_SERVER_GATEWAY+'/news/postReactionStatus';
	let HEADERSSTATUS = {
		method: 'POST',
		body: JSON.stringify({
			article_id: dataArticle.id
		}),
		credentials: 'include',
       	headers:{	
       		'Content-Type':'application/json'
       	},
	};
	const responseStatus = await fetch(ENDPOINTSTATUS,HEADERSSTATUS);
	if(responseStatus.ok){
	const jsonStatus = await responseStatus.json();
	console.log(jsonStatus);
	dataArticle.reaction_type = jsonStatus.reaction_type;
	}

	return {article:dataArticle}


}