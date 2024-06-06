
<script>
	import {onMount} from 'svelte';
	import {submitImage} from '$lib/api/auth.js';    
	import ImageIcon from '$image/emojis/image.svg';
	import {devEnvironment} from '$lib/api/keys.js';

	let formImage;
    let inputImage;	
    let isPosted = false;
    let avatar;

   	export let fromOnlineResource = false;
   	export let url="";
    const postImage = async (e)=>{
      try{
        const formData = new FormData(formImage);
        let response = await submitImage(formData);
        let image = inputImage.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result
        };
        fromOnlineResource = false;
        isPosted = true;
      }
      catch(err){
        console.log('erro: ', err);
      }

    }

</script>

<form class="relative" bind:this="{formImage}" enctype="multipart/form-data">
	<div class="bg absolute w-full h-full"></div>
	<label class="cursor-pointer image-label relative" for="imageInput">
			<img class="filter absolute opacity-0 mask" src="{ImageIcon}" />	
			{#if fromOnlineResource}
			<img src={devEnvironment.PUBLIC_STATIC_USERSFILE+url+'.webp'}/>			
			{:else}
			{#if isPosted}
			<img src={avatar}/>
			{:else}
			<img class="filter" src="{ImageIcon}" />
			{/if}
			{/if}

	</label>
	<input class="hidden" bind:this="{inputImage}" id="imageInput" value="" type="file" name="image" accept="image/*"  on:change="{postImage}"  />
</form>

<style>
  form{
  	border-radius: 100%;
  	overflow: hidden;
  	transition: all 1s;
    box-shadow: 0px 0px 0px 4px var(--CIS10);
  }
  .bg{
  	background-color: var(--CIS10);

  }

  form img{
    height: 100px;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
  .filter{
    padding: 1rem;
  	filter:contrast(var(--BG)) brightness(var(--CT));
  }
  
  form:hover .filter{
  	filter:contrast(var(--CT)) brightness(var(--BG));
  }
  
  form:hover .bg{
  	background-color: var(--CS10);
  }
  
  form label:hover .mask{
   	opacity: 0.9;
  	background-color: var(--CIS2);
  }

</style>
