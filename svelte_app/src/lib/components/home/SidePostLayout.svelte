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
function changeState(){
	if(reactType.style.display == "flex")
		reactType.style.display = "none";
	else
		reactType.style.display = "flex";
}

</script>

<div class="flex flex-col justify-start items-end fixed mr-5 mt-10 w-44 right-0 gap-10 reactionsSection">


			<div class="flex flex-col justify-center items-center h-46 w-14 absolute mr-12 p-4 gap-4 reactType" bind:this={reactType}>
				<div><img src={Fire}  on:click={()=>postReaction(1)}/></div>
				<div><img src={Heart} on:click={()=>postReaction(2)}/></div>
				<div><img src={Like} on:click={()=>postReaction(3)}/></div>
			</div>
			<span class="flex flex-row gap-2 justify-center">
				{article.fire_react+article.like_react+article.heart_react}
				{#if article.reaction_type==0}
				<img class="filter" src={HeartBlack} on:click={() => changeState()}/>
			
				{/if}
			
				{#if article.reaction_type==1}
				<img class="emoji" src={Fire} on:click={() => changeState()}/>
				{/if}
				{#if article.reaction_type==2}
				<img class="emoji" src={Heart} on:click={() => changeState()}/>
				{/if}
				{#if article.reaction_type==3}
				<img class="emoji" src={Like} on:click={() => changeState()}/>
				{/if}

			</span>	

			<span class="flex flex-row gap-2 justify-center">
				{article.comments.length}
				<img class="filter" src={Comment} on:click={handleClick}/>
			</span>	

</div>

<style>

	img{
		width: 27px;
		cursor: pointer;
		background: none;
		transform: translateY(-8px);
	}
	.filter{
		filter: contrast(var(--CT)) brightness(var(--BG));
	}
	.filter:hover{
		filter:contrast(var(--CT))  brightness(calc(var(--BG)/100 ));
	}
	.reactType{
		border-radius: 2rem;
		display: none;
	}
	.reactType div{
		height: 38px;
		width: 38px;
	}
	.reactType img{
		filter: none;
		width: 100%;
		height: 100%;
		transition: 1s;
		padding: 6px;
		border-radius: 100%;
		background: var(--CIS10);
		box-shadow: inset 0px 2px 10px 0px var(--CS4);
	}

	.reactType img:hover{
		filter: none;
		transform: rotateZ(10deg) translate(0px,0px) scale(1.3);
	}
	.emoji{
		filter: none;
	}
</style>