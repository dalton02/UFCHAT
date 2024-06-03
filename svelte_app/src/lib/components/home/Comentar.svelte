<script>
import User from '$image/user.svg';
import Button from '$shared/Button.svelte';
import {submitComment} from '$api/news.js';
import {page} from '$app/stores';
import {invalidateAll,goto} from '$app/navigation';

let text='';
export let currentArticle;
export let parentId;


const post = async ()=> {
	try{
		await submitComment(currentArticle,text,parentId);
		text='';
		await invalidateAll();

	}
	catch(err){

	}
}

</script>

<div class="flex flex-col gap-2 w-full">
<div class="flex flex-row gap-2 w-full">
		{#if parentId == 0}
		<textarea class="w-full text-base" placeholder="Escreva o que pensa do tema" resize='none' bind:value={text}/>
		{:else}
		<textarea class="w-full text-base parentComment" placeholder="Escreva o que pensa do tema" resize='none' bind:value={text}/>
		{/if}
		
</div>
<div class="container flex flex-row gap-5 justify-end w-full">
<button class="b1" on:click={post}>Comentar</button>
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
		height: 150px;
		border-radius: .5rem;
	}
	.parentComment{
		height: 100px;
	}
	textarea:focus-visible{
		border: 1px solid var(--CIS2);
		outline: none;
	}

</style>