<script>
import "$src/app.css";
import User from '$image/user.svg';
import Fire from '$image/emojis/fire.svg';
import Heart from '$image/emojis/redHeart.svg';
import Like from '$image/emojis/like.svg';
import Comment from '$image/emojis/comment.svg';
import Button from '$shared/Button.svelte';
import Comentar from '$lib/components/home/Comentar.svelte';
import SidePostLayout from '$lib/components/home/SidePostLayout.svelte';
import {formatData,timeToRead, nameNormalize} from '$lib/logic/util.js';
import {marked} from 'marked'
import {devEnvironment} from '$lib/api/keys.js';
   
let commentSection;
 
export let data;
console.log(data);
let article;
$: article = data.article;
const moveTo = (div) =>{
	window.scrollTo({ top: div.getBoundingClientRect().y, behavior: 'smooth'});
}
</script>
		
		<div class="showArticle flex flex-col gap-10 p-5 p:p-0 w-10/12">
		
			<div class="flex flex-row w-full gap-4 about">
		
				<img alt="user" src={devEnvironment.PUBLIC_STATIC_USERSFILE+article.author_user+'.webp'}/>
				<div class="flex flex-col gap-1">
					<span class="text-xl font-normal">{nameNormalize(article.author_name)}</span>
					<div class="flex flex-row flex-wrap gap-1">
					<span class="text-sm font-thin date">{timeToRead(data.article.content)} de leitura ·</span>
					<span class="text-sm font-thin date">{formatData(article.send_at,2)}</span>
					
					</div>
				</div>
		
			</div>

			<h1 class="text-5xl text-center m-0 text-bold">{article.title}</h1>

			<div class="markdown">
			{@html marked(article.content)}
			</div>
		
			<div class="flex flex-col mt-10 gap-10 p-3 p:p-0 commentSection" bind:this={commentSection}>
				<h2 class='text-2xl'>Comentarios</h2>
				{#if data.isAuth==true}
				<Comentar currentArticle={article.id} parentId={0} article={article}/>
				{/if}
				{#each article.comments as comment}
					<div class="flex flex-col gap-4 w-full">
					<div class="flex flex-row gap-2 w-full">
					<img alt="user" src={devEnvironment.PUBLIC_STATIC_USERSFILE+comment.author_user+'.webp'}
					/>
					<div class="flex flex-col w-full p-4  comment">
						<span class="flex flex-row flex-wrap items-center gap-1">
						<h3 class="text-sm m-0 font-bold">{nameNormalize(comment.author_name)} •</h3>
						<h5 class="text-xs m-0 font-thin h-full">{formatData(comment.send_at)}</h5>
						</span>
						<p class="text-base mt-3 font-normal">{@html marked(comment.content)}</p>
					</div>

					</div>

				
					<div class="flex flex-col items-end gap-4 ml-16 p:ml-8">
						{#if comment.childs.length>0}
						{#each comment.childs as child}
							<div class="flex flex-row gap-2 w-full">
								<img alt="user" src={devEnvironment.PUBLIC_STATIC_USERSFILE+child.author_user+'.webp'}/>
								<div class="flex flex-col w-full p-4 comment">
								<span class="flex flex-row flex-wrap gap-1">
								<h3 class="text-sm font-bold">{nameNormalize(child.author_name)} •</h3>
								<h5 class="text-xs font-thin">{formatData(child.send_at)}</h5>
								</span>
						<p class="text-base mt-3 font-normal">{@html marked(child.content)}</p>
					</div>

					</div>

						{/each}
						{/if}
						<div class="flex flex-row justify-end w-full">
						<div class="w-full">
						{#if data.isAuth==true}
						<Comentar currentArticle={article.id} parentId={comment.id} article={article}/>
						{/if}
						</div>
					</div>

					</div>
				</div>
				{/each}

			</div>


		</div>
		
		<SidePostLayout handleClick={() => moveTo(commentSection)} article={article}/>
		

		
<style>

	.showArticle{
		font-family: 'Rubik';
		color: var(--CIS10);
	}
	.date{
		color: var(--CIS8);
	}
	img{
		width: 35px;
		height: 35px;
		object-fit: cover;
		background: white;
		border-radius: 100%;

	}
	.about img{
		width: 50px;
		height: 50px;
		object-fit: cover;
	}
	.comment{
		border: 1px solid var(--CIS1);
		border-radius: .5rem;
	}
</style>