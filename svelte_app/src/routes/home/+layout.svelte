<script>
import bookE from '$lib/images/emojis/book.svg';
import coolE from '$lib/images/emojis/cool.svg';
import bellE from '$lib/images/emojis/bell.svg';
import configE from '$lib/images/emojis/config.svg';
import booksE from '$lib/images/emojis/books.svg';
import homeE from '$lib/images/emojis/house.svg';
import scrollE from '$lib/images/emojis/scroll.svg';
import BarMenu  from '$shared/BarMenu.svelte';
import "../../app.css";
import "$lib/fonts/fonts.css";
import {theme} from '$lib/stores/globalStore';
import {onMount} from 'svelte';

/**
* @type {HTMLDivElement}
*/
let menu;
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

<svelte:head>
  <meta name="color-scheme" content={`${$theme}`}/>
  <link rel="stylesheet" href={`/themes/dark.css`}/>
</svelte:head>



<div class="container">

<div class="flex flex-row justify-between menuTop">
	<div class="flex flex-row gap-5">
	<BarMenu handleClick={showMenu}/>
	<img alt="Logo here"/>
	</div>
	<div class="flex flex-row">
	<button>Nova postagem</button>
	</div>
</div>

<div class="flex flex-row">
<div class="flex flex-col p:hidden p:absolute menuSide" bind:this={menu}>
	<div class="flex flex-row item-center justify-between">
		<h1 class="text-3xl">ConectaUFCA</h1>
		<i class="hidden p:flex cursor-pointer" on:click={exitMenu}>x</i>
	</div>
	<ul class="flex flex-col mt-5">
		<li class="flex flex-row gap-5 cursor-pointer"><img src={homeE} alt="emoji"/>Home</li>
		<li class="flex flex-row gap-5 cursor-pointer"><img src={scrollE} alt="emoji"/>Editais</li>
		<li class="flex flex-row gap-5 cursor-pointer"><img src={booksE} alt="emoji"/>Artigos</li>
		<li class="flex flex-row gap-5 cursor-pointer"><img src={bellE} alt="emoji"/>Divulgações</li>
		<li class="flex flex-row gap-5 cursor-pointer"><img src={configE} alt="emoji"/>Configurações</li>
	</ul>
</div>

	<div class="flex flex-col justify-start items-center content-center w-full content">
		<slot></slot>
	</div>
</div>

</div>

<style>

.menuSide{
	width: 300px;
	padding: 20px;
	background: var(--CS10);
	height: 100dvh;
	font-family: 'Jaro';
}

.menuSide img{
	width: 25px;
	object-fit: contain;
	
}
.menuTop{
	padding:20px;
	background: var(--CS10);
	font-family: 'Jaro';
}

.container{
	width: 100vw;
	height: 100%;
	max-width: 2000px;
}
li{
	transition: .5s;
	padding: 20px 0px 20px 0px;
}
li:hover{
	transform: translateX(10px);

}

</style>