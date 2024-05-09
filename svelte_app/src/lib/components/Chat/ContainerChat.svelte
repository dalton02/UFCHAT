<script> 
	import Input from '$lib/components/Chat/Input.svelte';
	import GroupPop from '$lib/components/Chat/GroupPop.svelte';
	import user from '$lib/images/user.svg';	
	import NavSwitch from '$lib/components/NavSwitch.svelte';
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';

</script>


<div class="flex flex-col gap-10 containerChat">


	<div class="flex flex-col gap-5 justify-center items-center content-center headerChat">
	<NavSwitch/>
	<Input placeholder="Buscar usuario ou grupo"/>
	</div>


	
	<div class="flex flex-col items-center content-center groups">
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
		background: var(--color2);
		overflow: hidden;
		color: var(--colorInverted);
		font-family: 'Nexa';
	}
	.headerChat{
		height: 15%;
		width: 100%;
	}
	.groups{
		gap:2rem;
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