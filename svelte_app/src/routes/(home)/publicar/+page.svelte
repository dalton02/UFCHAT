
<script>
 	import { marked } from 'marked'
    import ImageIcon from '$image/emojis/image.svg';
    import { submitImage,submitPost } from '$lib/api/news.js';
  
    import {onMount} from 'svelte';
	let formImage;
	let formPost;
	let inputImage;
	let myArticle = "";
	let myTitle = "";
	let writeContainer;
	let previewContainer;

	onMount(()=>{
		inputImage.addEventListener('change',()=>{
			postImage();
		})
	})

	const postImage = async(event)=> {
		try{

	    const formData = new FormData(formImage);
        var input = document.querySelector('input[type="file"]');
        formData.append('file',input.files[0]);
		const response = await submitImage(formData);
		console.log(response);
        myArticle += response;
		}
		catch(err){
			console.log(err);
		}
	}
	const postArticle = async(event)=> {
		try{
			submitPost(myTitle,myArticle,2021007419,["UFCA","teste","Maneiro"]); //Example
		}
		catch(err){
			console.log(err);
		}
    }
    const showPreview = () =>{
    	previewContainer.style.display="flex";
    	writeContainer.style.display="none";
    }
    const killPreview = () =>{
    	previewContainer.style.display="none";
    	writeContainer.style.display="flex";
    }

</script>

<div class="container p-14 pt-0 pb-0 flex flex-col items-center" bind:this={writeContainer}>
<textarea class="p-14 pb-0 pt-10 w-5/6 text-3xl textTitle" placeholder="Titulo" bind:value={myTitle}/>

<div class="myForm flex flex-col justify-center p-2 m-0">

	<form on:submit|preventDefault={postImage} bind:this={formImage} enctype="multipart/form-data">
		<label for="imageInput">
			<img src={ImageIcon}/>
		</label>
		<input bind:this={inputImage} id="imageInput" value="" type="file" name="imagem" accept="image/*">
	</form>

</div>

<textarea class="p-14 m-0 w-5/6" placeholder="Escreva aqui...." bind:value={myArticle}/>


<form bind:this={formPost} class="flex flex-row gap-5 mt-10">
	<button class="b1" on:click={postArticle}>Postar</button>
	<button class="b2" on:click={showPreview}>Preview</button>
</form>
</div>

<div class="container2 p-14 pt-0 flex flex-col items-center gap-2" bind:this={previewContainer}>
	<button class="b1" on:click={killPreview}>Voltar a escrever</button>

	<h1 class="text-5xl">{myTitle}</h1>

	<div class="markdown p-14 pt-4 w-full">
		{@html marked(myArticle)}
	</div>
	
</div>

<style>
.myForm img{
	width: 35px;
	height: 35px;
	filter: contrast(var(--CT)) brightness(var(--BG));
	border-radius: 100%;
	padding: 5px;
	background: var(--CIS-5);
	transition: .2s;
}
.myForm label{
	cursor: pointer;
}
.myForm label:hover img{
	background: var(--CIS2);
}
#imageInput{
	display: none;
}
.container{
}
.container2{
	display: none;
}
textarea{
	height: 270px;
	color: black;
	background: var(--CIS-5);
	resize: none;
	color: var(--CIS10);
	border-radius: .5rem;
}

textarea:focus-visible{
	outline: none;
	border: none;
}
input{
	margin: 0;
	padding: 0;
}

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

.textTitle{
	height: 120px;
}
.markdown{
	width: 100%;
	color: var(--CIS10);
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

