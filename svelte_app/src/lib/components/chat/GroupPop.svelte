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


<div class="flex flex row content-center items-center pop w-full" on:click={handleClick} 
class:selected={idChat == $currentIdChat}>

	<div class="profileImg">
	<img src={profile}/>
	</div>
	<div class="flex flex-col ml-2 w-full">
	<div class="flex flex-row justify-between w-full">
	<h3 class="text-xl np:text-sm">{group}</h3>
	<h5 class="text-.8rem">{dateFormat}</h5>
	</div>
	<h4 class="text-sm">{lastMessage}</h4>
	</div>
	
</div>

<style>
.pop{
	height: 100%;
	background: inherit;
	overflow: hidden;
	color: var(--colorInverted);
	font-family: 'Lato';
	position: relative;
	width: 100%;
	cursor: pointer;
	text-indent: 3px;
	padding:10px;
}
h3{
margin: 0;
font-weight: bold;
}
h4{
	margin: 0;
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px;
  width: 100%;
}
h5{
	margin: 0;
}
span{
margin: 0;
}
.profileImg{
	min-width: 15%;
	width: 15%;
	max-height: 100%;
	aspect-ratio: 1/1;
	border-radius: 100%;
	overflow: hidden;
}
.pop img{
	object-fit: contain;
	aspect-ratio: 3/3;
	width: 100%;	
	transform: translateY(2px);
}
.selected{
	background-color: rgba(0,0,0,.05);
}
</style>