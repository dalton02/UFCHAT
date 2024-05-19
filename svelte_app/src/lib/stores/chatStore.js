import {writable} from 'svelte/store';

const currentIdChat = writable(2);
const chat = writable([{
	details:{},
	messages:[]
}]);
const userScreen = writable('containerChat');

export {currentIdChat,chat,userScreen};