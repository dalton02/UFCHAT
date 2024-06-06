<script>
import {submitReaction} from '$api/news.js';

import Fire from '$image/emojis/fire.svg';
import Heart from '$image/emojis/redHeart.svg';
import Like from '$image/emojis/like.svg';
import Comment from '$image/emojis/comment.svg';
import HeartBlack from '$image/emojis/heart.svg';
import {invalidateAll} from '$app/navigation'
export let article;
export let handleClick;

let reactType;
async function postReaction(reaction_type){
	try{
		console.log(article.id);
		await submitReaction(article.id,reaction_type);
		invalidateAll();
		changeState();
	}
	catch(err){
		console.log(err);
	}
}
function changeState(type){
	if(type == "exit")
		reactType.style.display = "none";
	else
		reactType.style.display = "flex";
}

</script>

<div class="flex flex-col justify-start items-end fixed mr-5 mt-10 w-44 right-0 gap-10 reactionsSection">


			<div class="flex flex-row justify-center items-center absolute w-48 h-11 text-center mr-14 
			gap-4 reactType" bind:this={reactType} on:mouseenter={() => changeState()}
			on:mouseleave={() => changeState('exit')}>
				<img src={Fire}  on:click={()=>postReaction(1)}/>
				<img src={Heart} on:click={()=>postReaction(2)}/>
				<img src={Like} on:click={()=>postReaction(3)}/>
			</div>
			<div class="absolute w-64 h-16 mb-10 boxLeft" on:mouseleave={() => changeState('exit')}>
			</div>
			<span class="flex flex-row gap-2 justify-center">
				{article.fire_react+article.like_react+article.heart_react}
				{#if article.reaction_type==0 || article.reaction_type==null}
				<img class="filter" src={HeartBlack} on:mouseenter={() => changeState()}/>		
				{/if}
			
				{#if article.reaction_type==1}
				<img class="emoji" src={Fire} on:mouseenter={() => changeState()}/>
				{/if}
				{#if article.reaction_type==2}
				<img class="emoji" src={Heart} on:mouseenter={() => changeState()}/>
				{/if}
				{#if article.reaction_type==3}
				<img class="emoji" src={Like} on:mouseenter={() => changeState()}/>
				
				{/if}

			</span>	

			<span class="flex flex-row gap-2 justify-center">
				{article.comments.length}
				<img class="filter" src={Comment} on:click={handleClick}/>
			</span>	

</div>

<style>
	.boxLeft{
		transform: translateY(-20px);
		z-index: 0;
	}
	img{
		width: 27px;
		cursor: pointer;
		background: none;
		transform: translateY(-8px);
		z-index: 999;
	}
	.filter{
		filter: contrast(var(--CT)) brightness(var(--BG));
	}
	.filter:hover{
		filter:contrast(var(--CT))  brightness(calc(var(--BG)/100 ));
	}
	.reactType{
		border-radius:1rem;
		background: var(--CTH);
		border: 0px solid var(--CIS10);
		transform: translateY(-10px);
		display: none;
		z-index: 9999;
	}
	.reactType img{
		filter: none;
		position: relative;
		height: 38px;
		width: 38px;
		transition: 1s;
		padding: 6px;
		border-radius: 100%;
		transform: translateY(0px);
	}

	.reactType img:hover{
		filter: none;
		transform: rotateZ(10deg) translate(0px,0px) scale(1.3);
	}
	.emoji{
		filter: none;
	}
</style>