

export interface InterfaceUser{
	login: string;
	fullname: string;
	id: number;
	nickname: string;
	course: string;
}

export interface InterfaceToken{
	data: {
		login: string;
		fullname: string;
		id: number;
		nickname: string;
		course: string;
	};
	expired: string;
}

export const generalChats = [5,6,7]; 