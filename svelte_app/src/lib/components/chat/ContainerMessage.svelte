<script> 
	import Input from '$lib/components/chat/Input.svelte';
	import MessagePop from '$lib/components/chat/MessagePop.svelte';
	import InputChat from '$lib/components/chat/InputChat.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import {nick} from "$lib/stores/globalStore.js";
	import { onMount } from 'svelte';
	
	let currentMessages;
	let info;

	currentIdChat.subscribe( (value) => {
		for(let i=0;i<$chat.length;i++){
		if($chat[i].details.id == $currentIdChat){
				currentMessages = $chat[i].messages;
				info = $chat[i].details;
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
  

  onMount (()=>{
  	nick.set(window.localStorage.userNick);
  })

</script>


<div class="flex flex-col items-center containerMessage">

	<div class="flex flex-row items-center content-center gap-2 chatInfo">
			<div class="infoImage"></div>
			<h1 class="text-3xl m-0">{info.name}</h1>
	</div>


	<div class="flex flex-col gap-2 message">

	{#each currentMessages as message}
	
	{#if message.sender_nick==$nick}
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
	<br/><br/><br/><br/>
	</div>

	<div class="flex flex-row justify-center items-center content-center gap-2 p-4 inputChat">

			<InputChat/>

	</div>

</div>

<style>
	.chatInfo{
		height: 10%;
		width: 100%;
		color: var(--CIS10);
		position: relative;
  	z-index: 999;
  	}
		.chatInfo::after{
		z-index: 0;
		content: "";
		width: 100%;
		height: 100%;
		background-color: var(--CS10);
  	border: 1px solid var(--CIS1);	
		position: absolute;
		}
		.chatInfo h1{
			font-family: 'Jaro', sans-serif;
			z-index: 999;
		}
		.infoImage{
			max-width: 28%;
			height: 45%;
			aspect-ratio: 1/1;
			border-radius: 100%;
			margin-left: 1%;
		  background: rgba(0, 220, 0, 0.6);
  		border-radius: 100%;
  		border: 1px solid rgba(0, 0, 0, 0.12);
			z-index: 999;
  	
		}
		
	.containerMessage{
		background-color: var(--CS10);
		overflow: hidden;
		color: black;
		width: 100%;
		height: 100%;
		position: relative;
 	}
	.message{
		width: 100%;
		height: 90%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	/* Chrome, Edge, and Safari */
  	.message::-webkit-scrollbar {
    width: 7px;
  	}
  	.message::-webkit-scrollbar-thumb {
    background-color: var(--CD2);
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
.inputChat{
	flex-grow: 1;
	position: absolute;
	bottom: 0;
	height: 9%;
	width: 90%;
 	z-index: 99999;
	background: var(--CIS10);
  border-radius: 100px;
  margin-bottom: 20px;
	}	

</style>