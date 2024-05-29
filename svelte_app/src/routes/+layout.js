export const ssr = false; //Nota: Obviamente deve ser carregado ao lado do cliente

import {devEnvironment} from '$lib/api/keys.js';


//Todas as rotas vão herdar este layout para detectar se você está logado
//Já que nossos cookies httpOnly não vão ajudar o cliente a saber se ele de fato está logado
export const load = async({fetch}) =>{
	console.log("layout.js");
	const head = {
		method: 'POST',
		credentials: 'include'
	};
	const endpoint = devEnvironment.PUBLIC_SERVER_GATEWAY+'/gateway/isAuth';
	const response = await fetch(endpoint,head);
	console.log(response.ok);
	if(!response.ok)
		return {isAuth:false}
	return{isAuth: true}
}