<script>
	import {io} from 'socket.io-client';
	import ContainerChat from '$lib/components/Chat/ContainerChat.svelte';
	import ContainerMessage from '$lib/components/Chat/ContainerMessage.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import {enterChat,receiveMessage} from '$lib/api/chat';
	
	export let data;
	let messages = data.chat;
	
	chat.set(messages);
	currentIdChat.set(messages[0].details.id);
	console.log(data.session);
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
