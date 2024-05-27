<script>
import "$src/app.css";
import "$lib/fonts/fonts.css";
import bookE from '$lib/images/emojis/book.svg';
import coolE from '$lib/images/emojis/cool.svg';
import bellE from '$lib/images/emojis/bell.svg';
import configE from '$lib/images/emojis/config.svg';
import booksE from '$lib/images/emojis/books.svg';
import homeE from '$lib/images/emojis/house.svg';
import scrollE from '$lib/images/emojis/scroll.svg';
import BarMenu  from '$shared/BarMenu.svelte';
import Button from '$shared/Button.svelte';

import {onMount} from 'svelte';
import {goto} from '$app/navigation';

let menu;
export let data
const isAuth = false;


function showMenu(){
	menu.style.display = "flex";
}

function exitMenu(){
	menu.style.display = "none";
}

function handleSize(){
	if(window.innerWidth>800){
		menu.style.display = "flex";
		console.log(menu);
	}
	else{
		menu.style.display="";
	}
}

onMount(()=>{
	window.addEventListener('resize',handleSize);
	handleSize();
})

</script>



<div class="container">

<div class="flex flex-row justify-between w-full menuTop">
	<div class="flex flex-row gap-5">
	<BarMenu handleClick={showMenu}/>
	<img alt="Logo here"/>
	</div>
	<div class="flex flex-row">

	{#if isAuth}
	<Button value="Nova Postagem" handleClick={()=>{goto('/post')}}/>
	{:else}
	<Button value="Faça seu login" handleClick={()=>{goto('/login')}}/>
	{/if}

	</div>
</div>

<div class="flex flex-row">
<div class="flex flex-col p:hidden p:absolute menuSide" bind:this={menu}>
	<div class="flex flex-row item-center justify-between">
		<h1 class="text-3xl">ConectaUFCA</h1>
		<i class="hidden p:flex cursor-pointer" on:click={exitMenu}>x</i>
	</div>
	<ul class="flex flex-col mt-5">
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={() => goto('/')}>
		<img src={homeE} alt="emoji"/>Home</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/editais')}>
		<img src={scrollE} alt="emoji"/>Editais</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/artigos')}>
		<img src={booksE} alt="emoji"/>Artigos</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/divulgacoes')}>
		<img src={bellE} alt="emoji"/>Divulgações</li>
		
		<li class="flex flex-row gap-5 cursor-pointer" on:click={()=>goto('/configuracoes')}>
		<img src={configE} alt="emoji"/>Configurações</li>
	</ul>
</div>

	<div class="flex flex-col justify-start items-center content-center w-full gap-10 content">
		<slot></slot>
	</div>
</div>

</div>

<style>

.menuSide{
	width: 300px;
	padding-left: 60px;
	background: var(--CS10);
	z-index: 99999;
	font-family: 'Jaro';
	margin-top: 100px;
}

.menuSide img{
	width: 25px;
	object-fit: contain;
	
}
.menuTop{
	padding-left: 60px;
	padding-right: 60px;
	padding-bottom: 10px;
	padding-top: 30px;
	position: fixed;
	z-index: 99999999;
	background: var(--CS10);
	font-family: 'Jaro';
}
.content{

	margin-top: 100px;
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