<script> 
	import Input from '$lib/components/Chat/Input.svelte';
	import GroupPop from '$lib/components/Chat/GroupPop.svelte';
	import user from '$lib/images/user.svg';	
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import InfoChat from '$lib/components/Chat/InfoChat.svelte';

</script>


<div class="flex flex-col content-center items-center gap-10 containerChat">

	<div class="containerInfo">
	<InfoChat/>
	</div>

	
	<div class="flex flex-col mt-5 justify-center items-center content-center groups">
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
		background-color: var(--colorScheme);
		overflow: hidden;
		color: var(--colorInverted);
		font-family: 'Jaro', sans-serif;
  		box-shadow: inset -10px 0px 80px 0px rgba(0, 0, 0, 0.16);
	}
	.containerInfo{
		height: 30%;
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
    background-color: var(--color1);
    border-radius: 10px;
  	}
  	.groups::-webkit-scrollbar-button:single-button {
    width: 0;
    }

</style>