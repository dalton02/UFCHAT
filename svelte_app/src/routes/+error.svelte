<script>
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import Button from '$shared/Button.svelte';
  let eyes1;
  let eyes2;

  	function eyeball(event) {
   		let x = eyes1.getBoundingClientRect().left + eyes1.clientWidth / 2;
     	let y = eyes1.getBoundingClientRect().top + eyes1.clientHeight / 2;
     	let radian = Math.atan2(event.pageX - x, event.pageY - y);
     	let rotate = radian * (180 / Math.PI) * -1 + 270;
     	eyes1.style.transform = `rotate(${rotate}deg)`;

   		x = eyes2.getBoundingClientRect().left + eyes2.clientWidth / 2;
     	y = eyes2.getBoundingClientRect().top + eyes2.clientHeight / 2;
     	radian = Math.atan2(event.pageX - x, event.pageY - y);
     	rotate = radian * (180 / Math.PI) * -1 + 270;
     	eyes2.style.transform = `rotate(${rotate}deg)`;
   	}

  	onMount(()=>{
  		document.body.addEventListener('mousemove',eyeball);
  		
  	});

</script>
<div class="container flex flex-row justify-center items-center gap-5">
<div class="eye" bind:this={eyes1}></div>
<div class="eye" bind:this={eyes2}></div>
</div>
<p class="text-2xl">Acho que você perdeu as estribeiras</p>
<Button value="Ir para homepage" handleClick={()=>goto('/')}/>


<style>
	p{
		padding: 10px;
		font-family: 'Jaro';
	}
	.eye{
		width: 30px;
		height: 30px;
		border-radius: 1000rem;
		background: var(--CIS10);
		position: relative;
		padding: 2px;
		}
	.container{
		height: 40px;
	}
	.eye::before {
		content: '';
		width: 55%;
		aspect-ratio: 1/1;
		border-radius: 100%;
		background: var(--CS10);
		border: 1px solid var(--CIS10);
		position: absolute;
		
}
</style>