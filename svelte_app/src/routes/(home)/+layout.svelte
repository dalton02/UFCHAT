<script>
import "$src/app.css";
import "$lib/fonts/fonts.css";
import bellE from '$lib/images/emojis/bell.svg';
import configE from '$lib/images/emojis/config.svg';
import booksE from '$lib/images/emojis/books.svg';
import homeE from '$lib/images/emojis/house.svg';
import scrollE from '$lib/images/emojis/scroll.svg';
import chatE from '$lib/images/chatIcon.svg';
import BarMenu  from '$shared/BarMenu.svelte';
import Button from '$shared/Button.svelte';
import Logo from '$image/logo.svg';
import {onMount} from 'svelte';
import {goto} from '$app/navigation';

let menu;
export let data
const isAuth = data.isAuth;


function showMenu(){
	menu.style.display = "flex";
}

function exitMenu(){
	menu.style.display = "none";
}

function handleSize(){
	if(window.innerWidth>800){
		menu.style.display = "flex";
		
		menu.style.zIndex="99";
	}
	else{
		menu.style.display="";
		menu.style.zIndex="999999999";
	}
}

onMount(()=>{
	window.addEventListener('resize',handleSize);
	handleSize();
})

</script>



<div class="container">

<header class="flex flex-row flex-wrap justify-between content-center fixed
w-full menuTop h-24 pl-16 pr-16 p:h-32 p:p-0 p:justify-center p:gap-4">
	<div class="flex flex-row items-center content-center gap-2">
	<BarMenu handleClick={showMenu}/>
	<img src={Logo} alt="Logo here"/>
	<h1 class="text-3xl m-0">ConectaUFCA</h1>
	</div>
	<div class="flex flex-row p:w-full justify-center items-center content-center">

	{#if isAuth}
	<Button value="Nova Postagem" handleClick={()=>{goto('/publicar')}}/>
	{:else}
	<Button value="Faça seu login" handleClick={()=>{goto('/login')}}/>
	{/if}

	</div>
</header>

<div class="flex flex-row">
<div class="flex flex-col p:fixed p:hidden mt-28 pl-16 pt-4 pr-2 p:pl-4 gap-4  p:m-0 menuSide " bind:this={menu}>
	<div class="flex flex-row item-center justify-between">
		<h1 class="text-2xl">Menu</h1>
		<i class="hidden p:flex cursor-pointer" on:click={exitMenu}>x</i>
	</div>
	<ul class="flex flex-col ml-6">
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={() => goto('/')}>
		<img src={homeE} alt="emoji"/>Home</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/chat')}>
		<img src={chatE} alt="emoji"/>Chat</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/editais')}>
		<img src={scrollE} alt="emoji"/>Editais</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/configuracoes')}>
		<img src={configE} alt="emoji"/>Configurações</li>

	</ul>
</div>

	<div class="flex flex-col justify-start items-center content-center w-full mt-28 p:mt-36 p-0 gap-10 content">
		<slot></slot>
	</div>
</div>

</div>

<style>

.menuSide{
	width: 300px;
	top: 0;
	background: var(--CS10);
	z-index: 99999;
	font-family: 'Jaro';
	height: 100dvh;
}

.menuSide img{
	width: 25px;
	object-fit: contain;
	
}
.menuTop{
	z-index: 9999999;
	max-width: 2000px;
	font-family: 'Jaro';
	background: var(--CS10);
}
.menuTop img{
	position: relative;
	height: 44px;
	margin-top: 10px;
}

.container{
	width: 100vw;
	height: 100%;
	max-width: 2000px;
	font-family: 'Font6';
}
li{
	transition: .5s;
	padding: 15px 0px 15px 0px;
}
li:hover{
	transform: translateX(10px);

}

</style>