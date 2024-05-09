<script> 
	import Input from '$lib/components/Chat/Input.svelte';
	import MessagePop from '$lib/components/Chat/MessagePop.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import {sendMessage,receiveMessage} from '$lib/api/chat';
	
	let currentMessages;

	currentIdChat.subscribe( (value) => {
		for(let i=0;i<$chat.length;i++){
		if($chat[i].details.id == $currentIdChat){
				currentMessages = $chat[i].messages;
				break;	
		}
	}
	})

	chat.subscribe( (value) => {
	for(let i=0;i<$chat.length;i++){
		if($chat[i].details.id == $currentIdChat){
				currentMessages = $chat[i].messages;
				break;	
		}
	}	
	});
	
  const handleSendMessage = async () => {
  	const conversation_id = $currentIdChat;
  	const body = "Hey svelte";
  	const sender_id = 2021007419;
  	const sender_nick = 'Jose';
  	sendMessage(conversation_id,body,sender_id,sender_nick);
  }

  

</script>


<div class="flex flex-col containerMessage">


	<div class="flex flex-col mt-5 gap-2 message">

	{#each currentMessages as message}
	
	{#if message.sender_nick=="Jose"}
	<div class="right">
	<MessagePop
	user="Você" 
	message={message.body} 
	date={message.send_at}
	/>
	</div>
	
	{:else}
	<div class="left">
	<MessagePop
	user={message.sender_nick} 
	message={message.body} 
	date={message.send_at}
	/>
	</div>
	{/if}
	{/each}
	
	</div>

	<div class="flex flex-row justify-around items-center content-center inputChat">
			<Input placeholder="Escreva sua mensagem"/>
			<button on:click={handleSendMessage}>OK</button>
	</div>

</div>

<style>
	.inputChat{
		height: 8%;
		bottom: 0;
		width: 100%;
		position: absolute;
	}	
	.containerMessage{
		background: var(--color2);
		overflow: hidden;
		color: black;
		font-family: 'Nexa';
		width: 100%;
		height: 100%;
		position: relative;
	}
	button{
		width: 5%;
		aspect-ratio: 3/2;
		border-radius: 20px;
		background: var(--color3);
	}
	.message{
		width: 100%;
		overflow-y: scroll;
	}
	/* Chrome, Edge, and Safari */
  	.message::-webkit-scrollbar {
    width: 7px;
  	}
  	.message::-webkit-scrollbar-thumb {
    background-color: var(--color1);
    border-radius: 10px;
  	}
  	.message::-webkit-scrollbar-button:single-button {
    width: 0;
    }

  	.left{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 20px;
  }
  .right{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 20px;
  }

</style>