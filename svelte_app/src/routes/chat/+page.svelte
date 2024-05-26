<script>
	import {io} from 'socket.io-client';
	import ContainerChat from '$lib/components/chat/ContainerChat.svelte';
	import ContainerMessage from '$lib/components/chat/ContainerMessage.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import {enterChat,receiveMessage} from '$lib/api/chat';
	import {browser} from '$app/environment';
	import { onMount } from "svelte";
	
	export let data;
	let messages = data.chat;
	
	chat.set(messages);
	//console.log("Em store:"+$chat);
	currentIdChat.set(messages[0].details.id);
	enterChat(data.session.sessionId);
	receiveMessage();
	

</script>

<div class="flex flex-row justify-center general mb-5">

	<div class="flex flex-row delimit">
  	
  		<div class="sideChat">
  			<ContainerChat/>
  		</div>
  		<div class="sideMessage">
  			<ContainerMessage/>
  		</div>

	</div>
	
</div>



<style>

.general{
	width: 100%;
	height: 100dvh;
	padding: 0;
	margin: 0;

}
.delimit{
	width: 100%;
	max-width: 2100px;
	max-height: 1000px;
	padding: 0;
	margin: 0;
}
.sideChat{
	width: 29%;
	height: 100%;
}
.sideMessage{
	flex-grow: 1;
	height: 100%;
}

</style>
