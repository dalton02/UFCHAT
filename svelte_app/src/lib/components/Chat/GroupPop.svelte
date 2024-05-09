<script>
	
	import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	export let group;
	export let lastMessage;
	export let profile;
	export let date;

	//Funções para definir qual chat está ativo na pagina
	export let idChat;

	
	function handleClick(event){
		currentIdChat.set(idChat);
	}


  let dateFormat = new Date(date);
  const hours = dateFormat.getHours();
  let minutes = dateFormat.getMinutes();
  if(minutes<10)
    minutes= "0"+minutes;
  dateFormat = hours+":"+minutes;


</script>


<div class="flex flex row content-center items-center pop w-full" on:click={handleClick}>

	<img src={profile}/>
	<div class="flex flex-col ml-3">
	<h3 class="text-2xl">{group}</h3>
	<span class="text-sm">{lastMessage}</span>
	</div>
	<h4 class="text-.8rem">{dateFormat}</h4>

</div>

<style>
.pop{
	height: 100%;
	background: inherit;	
	border-radius: .3rem;
	overflow: hidden;
	color: var(--colorInverted);
	font-family: 'Font1';
	position: relative;
	width: 95%;
	cursor: pointer;
}
h3{
margin: 0;
text-indent: 3px;
}
h4{
	position: absolute;
	right: 0;
	top:0;
}
span{
margin: 0;
}
.pop img{
	object-fit: contain;
	aspect-ratio: 3/3;
	width: 12%;	
	border-radius: 100%;
}
</style>