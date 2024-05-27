<script>

export let data;
console.log(data);
</script>

{#each data.articles as article}
	

	<div class ="flex flex-col justify-start gap-5 items-center content-center showArticle">
	
	<div class="flex flex-row w-full gap-5 about">
	<img alt="user"/>
	<div class="flex flex-col">
	<span class="text-base">Username</span>
	<span class="text-xs">12 de maio</span>
	</div>
	</div>
	<h1 class="text-4xl">{article.Title}</h1>

	<div class="flex flex-row justify-start w-full gap-5 about">
	<span class="text-sm tags">#CC</span>
	<span class="text-sm tags">#UFCA</span>
	</div>

	</div>



{/each}


<style>
	.showArticle{
		width: 80%;
		padding: 50px;
		background: var(--CIS2);
		backdrop-filter: blur(2px);
		border-radius: .5rem;
	}
	.showArticle h1{

	}
	.about{
		left:0;
	}
	.limitText{

   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   line-height: 1.4rem;     /* fallback */
   max-height: 200px;      /* fallback */ 
   -webkit-line-clamp: 7; /* number of lines to show */
   -webkit-box-orient: vertical;
	}
	p{
		text-align: justify;
	}


</style>