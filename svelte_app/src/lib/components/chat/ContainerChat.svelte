<script> 
	import Input from '$lib/components/chat/Input.svelte';
	import GroupPop from '$lib/components/chat/GroupPop.svelte';
	import user from '$lib/images/user.svg';	
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import InfoChat from '$lib/components/chat/InfoChat.svelte';

</script>


<div class="flex flex-col content-center gap-10 items-center containerChat">

	<div class="containerInfo">
	<InfoChat/>
	</div>

	
	<div class="flex flex-col justify-center items-center mt-10 content-center groups">
	{#each $chat as d}
	<GroupPop 
	group={d.details.name} 
	lastMessage={d.messages.length===0 ? "" : d.messages[d.messages.length-1].body} 
	date={d.details.created_at}	
	profile={user}
	idChat={d.details.id}
	/>

	{/each}
	
	</div>



</div>

<style>	
	.containerChat{
		width: 100%;
		height: 100%;
		background-color: var(--CS10);
		overflow: hidden;
		font-family: 'Jaro', sans-serif;
	}
	.containerInfo{
		height: 200px;
		width: 100%;
	}
	.groups{	
		width: 100%;
		overflow-y: scroll;
	}
	.groups::-webkit-scrollbar {
    width: 7px;
  	}
  	.groups::-webkit-scrollbar-thumb {
    background-color: var(--CD2);
    border-radius: 10px;
  	}
  	.groups::-webkit-scrollbar-button:single-button {
    width: 0;
    }

</style>