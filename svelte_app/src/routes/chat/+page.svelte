<script>
	import {io} from 'socket.io-client';
	import ContainerChat from '$lib/components/Chat/ContainerChat.svelte';
	import ContainerMessage from '$lib/components/Chat/ContainerMessage.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import {enterChat,receiveMessage} from '$lib/api/chat';
	
	export let data;
	data = data.chat;
	
	chat.set(data);
	currentIdChat.set(data[0].details.id);
	
	enterChat();
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
	max-height: 720px;
	padding: 0;
	margin: 0;
}
.delimit{
	width: 100%;
	max-width: 1450px;
	padding: 0;
	margin: 0;
}
.sideChat{
	height: 100%;
}
.sideMessage{
	flex-grow: 1;
	height: 100%;
}

</style>
