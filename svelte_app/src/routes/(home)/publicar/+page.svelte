<script>
	import { marked } from "marked";
	import ImageIcon from "$image/emojis/image.svg";
	import { submitImage, submitPost } from "$lib/api/news.js";
	import { changeDomainURL } from "$lib/logic/util.js";
	import { goto } from '$app/navigation';
	import { onMount } from "svelte"; 
	import { addToast } from "$store/globalStore.js";
    import Toaster from '$shared/Toaster.svelte';
   
	let formImage;
	let formPost;
	let inputImage;
	let myArticle = "";
	let myTitle = "";
	let tagsArray = [];
	let tagsSelector;
	let writeContainer;
	let previewContainer;

	onMount(() => {
		inputImage.addEventListener("change", () => {
			postImage();
		});
	});

	const postImage = async (event) => {
		try {
			addToast({
        		message: "Aguarde o upload da imagem",
        		type: "success",
        		dismissible: true,
        		timeout: 10000,
      		});
			const formData = new FormData(formImage);
			const response = await submitImage(formData);
			console.log(response);
			myArticle += response;
		} catch (err) {
			console.log(err);
		}
	};
	const postArticle = async (event) => {
		try {
			await submitPost(myTitle, myArticle, tagsArray); //Example
			await goto('/postagem/'+myTitle);
		} catch (err) {
			console.log(err);
		}
	};
	const showPreview = () => {
		console.log('a');
		previewContainer.style.display = "flex";
		writeContainer.style.display = "none";
	};
	const killPreview = () => {
		previewContainer.style.display = "none";
		writeContainer.style.display = "flex";
	};
</script>
	<Toaster/>

<div class="container relative p-14 pt-0 pb-0 p:p-0 flex flex-col items-center" bind:this="{writeContainer}">

	<textarea class="p-14 pb-0 pt-10 w-5/6 text-3xl textTitle" placeholder="Titulo" bind:value="{myTitle}" />

	<div class="myForm flex flex-col p-1 m-0">
		<form on:submit|preventDefault="{postImage}" bind:this="{formImage}" enctype="multipart/form-data">
			<label for="imageInput">
				<img src="{ImageIcon}" />
			</label>
			<input bind:this="{inputImage}" id="imageInput" value="" type="file" name="image" accept="image/*" />
		</form>
	</div>

	<textarea class="p-14 m-0 w-5/6" placeholder="Escreva aqui...." bind:value="{myArticle}" />
		
	<form bind:this="{formPost}" class="flex flex-row gap-5 mt-10">
		<button class="b1" on:click={postArticle}>Postar</button>
		<button class="b2" on:click={showPreview}>Preview</button>
		<button class="text-2xl font-extrabold flex flex-col justify-center items-center addTags"
		on:click={()=> tagsSelector.style.display="flex"}>+</button>	
	</form>	

	<div class="flex flex-col hidden absolute p-3 pl-5 pr-5 bottom-20 w-1/2 h-1/2 tagsSelector" type="text" bind:this={tagsSelector}>
		<i class="relative w-1 cursor-pointer" on:click={()=> tagsSelector.style.display="none"}>x</i>
		<div class="flex gap-20 gap-y-5 flex-row items-center justify-center flex-wrap">
		<span on:click={()=> tagsArray = [...tagsArray,'Tag1']}>TAG1</span>
		<span on:click={()=> tagsArray = [...tagsArray,'Tag2']}>TAG2</span>
		<span on:click={()=> tagsArray = [...tagsArray,'Tag3']}>TAG3</span>
		</div>
		
		<div class="flex flex-row mt-5 flex-wrap gap-5">
		Tags aplicadas: 
		{#each tagsArray as tag}
		<span class="p-3 pl-5 pr-5">{tag}</span>
		{/each}
		</div>
	</div>

</div>

<div class="container2 w-full p-14 pt-0 flex flex-col items-center gap-2" bind:this="{previewContainer}">
	<button class="b1" on:click="{killPreview}">Voltar a escrever</button>

	<h1 class="text-5xl">{myTitle}</h1>

	<div class="markdown p-14 pt-4 w-full">{@html marked(myArticle)}</div>
</div>

<style>
	.myForm img {
		width: 35px;
		height: 35px;
		filter: contrast(var(--CT)) brightness(var(--BG));
		border-radius: 100%;
		padding: 5px;
		background: var(--CIS-5);
		transition: 0.2s;
	}
	.myForm label {
		cursor: pointer;
	}
	.myForm label:hover img {
		background: var(--CIS2);
	}
	#imageInput {
		display: none;
	}
	.container {
	}
	.container2 {
		display: none;
	}
	textarea {
		height: 270px;
		color: black;
		background: var(--CIS-5);
		resize: none;
		color: var(--CIS10);
		border-radius: 0.5rem;
	}

	textarea:focus-visible {
		outline: none;
		border: none;
	}
	input {
		margin: 0;
		padding: 0;
	}

	button {
		background: var(--CD);
		padding: 20px;
		padding-bottom: 5px;
		padding-top: 5px;
		border-radius: 0.3rem;
		transition: 0.2s;
		font-family: "Jaro";
	}
	button:hover {
		filter: brightness(1.5);
	}
	.b2 {
		background: var(--CD2);
	}
	.addTags{
		border-radius: 100%;
		width: 40px;
		height: 40px;
		background: var(--CIS1);
		font-family: 'Lato';
	}
	.tagsSelector{
		border-radius: .3rem;
		background: var(--CS10);
		border: 1px solid var(--CIS4);
		overflow-y: scroll;
	}
span{
		background: var(--CIS1);
		padding: 20px;
		padding-top: 5px;
		padding-bottom: 5px;
		border-radius: .5rem;
		cursor: pointer;
	}
	.textTitle {
		height: 120px;
	}
	.markdown {
		color: var(--CIS10);
		text-align: justify;
	}
	/* Chrome, Edge and Safari */

	*::-webkit-scrollbar {
		height: 10px;
		width: 6px;
	}

	*::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: var(--CIS4);
	}

	*::-webkit-scrollbar-thumb:hover {
		background-color: var(--CIS6);
	}
</style>
