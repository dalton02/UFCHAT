<script>
	import lupa from '$lib/images/search.svg';
	import Input from '$lib/components/chat/Input.svelte';
</script>

<div class="flex flex-col gap-5 justify-center headerChat relative">
	
	
	<div class="flex flex-col w-full gap-5 presentation">
	
	<h1 class="text-5xl">UFchat</h1>

	<ul class="flex flex-row justify-start gap-5 text-lg">
		<li>Chat</li>
		<li>Perfil</li>
		<li>Configurações</li>

	</ul>
	
	</div>

	<div class="flex flex-row w-80 ml-5 relative">
	<Input placeholder="Buscar usuario ou grupo" lupa={lupa}/>
	</div>
	
</div>

	<div class="w-full flex-row relative anim">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,181.3C480,171,600,117,720,85.3C840,53,960,43,1080,53.3C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
	</svg>
	<svg id="wave2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,181.3C480,171,600,117,720,85.3C840,53,960,43,1080,53.3C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
	</svg>
	</div>

<style>	
	.headerChat{
		height: 100%;
		width: 100%;
		font-weight: 0;
		background: var(--CIS10);
		color:var(--CS10);
	}
  
  img{
    	max-width: 5%;
    	position: relative;
    	object-fit: contain;
  }
  h1{
	    	text-align: left;
	    	text-indent: 2rem;
	    	margin: 0;

  }
  ul{
  	margin-left: 1.8rem;
  }
  li{
  	cursor: pointer;
  }
  svg{
    	position: absolute;
    	width: 100%;
    	fill: var(--CIS10);
    	animation: 4.5s wave infinite linear;
    }
    #wave2{
    	position: absolute;
    	left: 99.7%;
    	top:0;
    }
    .anim{
    	transform: translateY(-2px);
    	height: 100%;
    }
    @keyframes wave{

    	0%{
    		transform: scale(-1) translateX(0);
    	}
    	100%{
    		transform: scale(-1) translateX(100%);
    	}

    }


</style>