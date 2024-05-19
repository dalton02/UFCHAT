<script>
	import {theme} from '$store/globalStore.js';
    import { onMount } from 'svelte';
    export let myTheme;
    export let icon;
    
    let isActive;
    
    $:{
    
    if($theme==myTheme)  	isActive=true;
	else isActive=false;
    
    }

	function switchTheme(){
		if($theme!=myTheme){
		   theme.set(myTheme);
		}
	}

 </script>

<div on:click={switchTheme} class="flex flex-row justify-center items-center content-center customToggle" class:active = {isActive}>
	<img src={icon}/>
</div>



<style>

.customToggle{
	width: 35px;
	aspect-ratio: 1/1;
	border-radius: 99rem;
	position: relative;	
	cursor: pointer;
}
.customToggle img{
	position: absolute;
	max-width: 70%;
	max-height: 70%;
	min-width: 70%;
	min-height: 70%;
	filter: contrast(0%) brightness(100.0) drop-shadow(1px 1px black) 
	drop-shadow(-1px 1px black) drop-shadow(1px -1px black) drop-shadow(-1px -1px black);
}

.customToggle:hover{
	animation: jiggle .5s normal linear;
}
.active{
}
.active::after{
	content:"";
	width: 100%;
	height: 100%;
	border-radius: .7rem;
	background: var(--color1);
}
@keyframes jiggle{
	0%{
		transform: rotateZ(0deg);
	}
	25%{
		transform: rotateZ(-25deg);
	}
	50%{
		transform: rotateZ(0deg);
	}
	75%{
		transform: rotateZ(25deg);
	}
	100%{
		transform: rotateZ(0deg);
	}
}

</style>