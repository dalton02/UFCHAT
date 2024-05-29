<script>
import "$src/app.css";
import User from '$image/user.svg';
import Fire from '$image/emojis/fire.svg';
import Heart from '$image/emojis/redHeart.svg';
import Like from '$image/emojis/like.svg';
import HeartBlack from '$image/emojis/heart.svg';
import Comment from '$image/emojis/comment.svg';
import Button from '$shared/Button.svelte';
import Comentar from '$lib/components/home/Comentar.svelte';
import {formatData} from '$lib/logic/util.js';
import {marked} from 'marked'
   
let commentSection;
 
function scrollToDiv(div) {
    div.scrollIntoView({ behavior: 'smooth' });
}

export let data;
console.log(data);
let article = data.article
</script>
		
		<div class="showArticle flex flex-col gap-10 p-5 w-10/12">
		
			<div class="flex flex-row w-full gap-2 about">
		
				<img alt="user" src={User}/>
				<div class="flex flex-col">
					<span class="text-base font-bold">{article.author_name}</span>
					<span class="text-xs font-thin">{formatData(article.send_at)}</span>
				</div>
		
			</div>

			<h1 class="text-5xl text-center text-bold">{article.title}</h1>


			{@html marked(article.content)}

		
			<div class="flex flex-col mt-10 gap-10 p-3 commentSection" bind:this={commentSection}>
				<h2 class='text-2xl'>Comentarios</h2>

				<Comentar currentArticle={article.id} parentId={0} article={article} />

				{#each article.comments as comment}

					<div class="flex flex-row gap-2 w-full">
					<img alt="user" src={User}/>
					<div class="flex flex-col w-full p-4 comment">
						<span class="flex flex-row gap-2">
						<h3 class="text-sm font-bold">{comment.author_name} •</h3>
						<h5 class="text-xs font-thin">{formatData(comment.send_at)}</h5>
						</span>
						<p class="text-base mt-3 font-normal">{@html marked(comment.content)}</p>
					</div>
					</div>

				{/each}

			</div>


		</div>
		
		<div class="flex flex-col justify-start items-center fixed mr-5 gap-10 reactionsSection">

			<span class="flex flex-row gap-2 justify-center">
				{article.fire_react+article.like_react+article.heart_react}
				<img src={HeartBlack}/>
			</span>	

			<span class="flex flex-row gap-2 justify-center">
				{article.comments.length}
				<img src={Comment} on:click={()=> scrollToDiv(commentSection)}/>
			</span>	


		</div>

		

		
<style>

	.showArticle{
		font-family: 'Rubik';
		color: var(--CIS10);
	}
	img{
		width: 35px;
		height: 35px;
		object-fit: contain;
		background: white;
		border-radius: 100%;
	}

	.reactionsSection{
		right: 0;
		margin-top: 30px;
		width: 50px;	
	}
	.comment{
		border: 1px solid var(--CIS1);
		border-radius: .5rem;
	}
	.reactionsSection img{
		width: 25px;
		filter: contrast(var(--CT)) brightness(var(--BG));
		cursor: pointer;
		background: none;
		transform: translateY(-8px);
	}
	.reactionsSection img:hover{
		filter:contrast(var(--CT))  brightness(calc(var(--BG)/100 ));
	}
</style>