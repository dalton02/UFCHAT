import {writable} from 'svelte/store';

const currentIdChat = writable(2);

const chat = writable([{
	details:{},
	messages:[]
}]);

export {currentIdChat,chat};