<script>
import User from '$image/user.svg';
import Button from '$shared/Button.svelte';
import {submitComment} from '$api/news.js';
import {page} from '$app/stores';
import {invalidateAll,goto} from '$app/navigation';

let text='';
export let currentArticle;
export let parentId;
console.log('a');
const post = async ()=> {
	try{
		await submitComment(currentArticle,text,parentId);
		text='';
		window.location.href = $page.url;

	}
	catch(err){

	}
}

</script>

<div class="flex flex-col gap-2">
<div class="flex flex-row gap-2 w-full">
		<img alt="user" src={User}/>
		<textarea class="w-full text-base" placeholder="Escreva o que pensa do tema" resize='none' bind:value={text}/>
</div>
<div class="container flex flex-row gap-5 justify-end w-full">
<button class="b1" on:click={post}>Comentar</button>
<button class="b2">Preview</button>
</div>
</div>


<style>
	button{
		background: var(--CD);
		padding: 20px;
		padding-bottom: 5px;
		padding-top: 5px;
		border-radius: .3rem;
		transition: .2s;
		font-family: 'Jaro';
	}
	button:hover{
		filter: brightness(1.4);
	}
	.b2{
		background: var(--CD2);
	}

	.container{
		margin: 0;
		right: 0;
	}
	img{
		width:40px;
		height: 40px;
		border-radius: 100%;
		background: white;
	}

	textarea{
		resize:none;
		background: var(--CTH);
		border: 1px solid var(--CIS2);
		padding: 10px;
		height: 200px;
		border-radius: .5rem;
	}
	textarea:focus-visible{
		border: 1px solid var(--CIS2);
		outline: none;
	}

</style>