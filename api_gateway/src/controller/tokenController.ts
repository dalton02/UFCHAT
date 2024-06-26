import jwt from 'jsonwebtoken'; 

import {InterfaceUser,InterfaceToken} from '../types/type';

import {devEnvironment} from '../types/environment';

export class TokenController{


generateAccessToken(login:string,fullname:string,id: number, nickname: string,course: string){
	return new Promise<string>( (resolve,reject)=>{
		const payload = {
			login: login,
			fullname: fullname,
			id: id,
			nickname: nickname,
			course: course
		};
		const options = {expiresIn: devEnvironment.TOKEN_ACCESS_EXPIRES};
		resolve(jwt.sign(payload,devEnvironment.ACCESS_TOKEN_SECRET,options));
	});
}

generateRefreshToken(id:number){
	return new Promise<string>((resolve,reject)=>{
		const payload = {
			id: id,
		};
		const options = {expiresIn: devEnvironment.TOKEN_REFRESH_EXPIRES};
		resolve(jwt.sign(payload,devEnvironment.REFRESH_TOKEN_SECRET,options));
	});
}


verifyToken(token:any,type: number) {
  return new Promise<{expired: boolean, data: any}>((resolve,reject) =>{
  try {
  	let key = devEnvironment.ACCESS_TOKEN_SECRET;
  	if(type==1) key = devEnvironment.REFRESH_TOKEN_SECRET;
  	
    const decoded = jwt.verify(token, key);
    resolve({ expired: false, data: decoded });
  } catch (error) {
  	resolve({ expired: true, data: error }); //Cannot be reject cause iwill throw erro too son
  }
});
}


}