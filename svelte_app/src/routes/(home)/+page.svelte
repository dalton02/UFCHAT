<script>
import User from '$image/user.svg';
import Fire from '$image/emojis/fire.svg';
import Heart from '$image/emojis/redHeart.svg';
import Like from '$image/emojis/like.svg';
import Comment from '$image/emojis/comment.svg';
import {goto} from '$app/navigation';
import {formatData,nameNormalize} from '$lib/logic/util.js';
import {devEnvironment} from '$lib/api/keys.js';
export let data;
console.log(data);

</script>

{#if data.articles!=null}
{#each data.articles as article}
	

	<div class ="flex flex-col justify-start items-center content-center showArticle 
	p-8 py-4 pr-0 w-10/12 p:px-4 gap-2" 
	on:click={goto(`/postagem/${article.title}`)}>
	
	<div class="flex flex-row w-full gap-2 about">
	<img alt="user" src={devEnvironment.PUBLIC_STATIC_USER+'/files/'+article.author_user+'.webp'}/>
	<div class="flex flex-col">
	<span class="text-base font-normal">{nameNormalize(article.author_name)}</span>
	<span class="text-xs font-thin date">{formatData(article.send_at,2)}</span>
	</div>
	</div>

	<div class="context w-full">
	<h1 class="text-4xl w-full font-semibold p-1 px-2">{article.title}</h1>

	<div class="flex flex-row justify-start w-full gap-1 mt-2 about">
	{#each article.tags.split(',').map(tag => tag.trim().replace(/[[\]{}()]/g, '')) as tag}
	<span class="text-xs tags font-normal p-1 px-2 tags">#{tag}</span>
	{/each}
	</div>

	<div class="flex flex-row justify-start w-full mt-5 gap-1 text-xs font-bold">
	{#if article.fire_react>0}
	<img class="emoji" src={Fire}/>
	{/if}
	{#if article.like_react>0}
	<img class="emoji" src={Like}/>
	{/if}
	{#if article.heart_react>0}
	<img class="emoji" src={Heart}/>
	{/if}


	{article.fire_react+article.like_react+article.heart_react} Reações
	<img src={Comment} class='svg ml-5'/>{article.comments.length} Comentarios	
	</div>
	</div>
	</div>



{/each}
{/if}

<style>
	.showArticle{
		background:var(--CIS-5);
		backdrop-filter: blur(2px);
		border-radius: .5rem;
		font-family: 'Rubik';
		cursor: pointer;
		border: 1px solid var(--CIS2);
	}
	.date{
		color:var(--CIS8);
	}
	.showArticle h1{
		text-align: left;
		margin: 0;
	}
	.showArticle img{
	 	width: 40px;
	 	aspect-ratio: 1/1;
	 	background: white;
	 	border-radius: 100%;
	}
	.context img{
		width: 1.2rem;
		height: 1.2rem;
		aspect-ratio: 1/1;
		background: NONE;
		object-fit: contain;
	}
	.svg{
		filter: contrast(var(--CT)) brightness(var(--BG));
	}
	.tags{
		border-radius: .5rem;
		border: 1px solid var(--CIS1);
		border-color: transparent;
		transition: all .5s;
	}
	.tags:hover{
		border-color: var(--CIS1);
		background: var(--CIS-5);
	}



	p{
		text-align: justify;
	}


</style>