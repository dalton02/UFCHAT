
class Session{

	private session: { sessionId: number, userId: number, userNick: string }[];
	private count:number;
	
	constructor(){
		this.session = [];
		this.count = 0;
	}

	enter(userId:number,userNick:string){
		const verify = this.verify(userId);
		if(verify){
			console.log("User already has a session stored");
			return verify.sessionId; 
		}
		this.session.push(
		{
			sessionId:this.count,
			userId: userId,
			userNick:userNick
		}
		);
		this.count++;
		console.log(this.session);
		return (this.count-1);
	}
	
	exit(sessionId:number){
		this.session = this.session.filter(session => session.sessionId !== sessionId);
	}

	get(sessionId:number){
		return this.session.find((user) => user.sessionId == sessionId);
	}
	
	verify(userId:number){
		return this.session.find((user) => user.userId == userId);
	}

}


export const sessionInstance = new Session();
