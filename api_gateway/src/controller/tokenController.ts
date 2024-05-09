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
		const options = {expiresIn: devEnvironment.TOKENACCESSEXPIRES};
		resolve(jwt.sign(payload,devEnvironment.ACCESSTOKENSECRET,options));
	});
}

generateRefreshToken(id:number){
	return new Promise<string>((resolve,reject)=>{
		const payload = {
			id: id,
		};
		const options = {expiresIn: devEnvironment.TOKENREFRESHEXPIRES};
		resolve(jwt.sign(payload,devEnvironment.REFRESHTOKENSECRET,options));
	});
}


verifyToken(token:any,type: number) {
  return new Promise<{expired: boolean, data: any}>((resolve,reject) =>{
  try {
  	let key = devEnvironment.ACCESSTOKENSECRET;
  	if(type==1) key = devEnvironment.REFRESHTOKENSECRET;
  	
    const decoded = jwt.verify(token, key);
    resolve({ expired: false, data: decoded });
  } catch (error) {
    reject({ expired: true, data: error });
  }
});
}


}