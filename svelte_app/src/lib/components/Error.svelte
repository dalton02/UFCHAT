

<div class="flex flex-row justify-center items-center container">
	<div class="rect rect-1 absolute"></div>
	<div class="rect rect-2 absolute"></div>
	<div class="circle"></div>
</div>

<style>
	.container{
		width: 40%;
		height: 40%;
		position: relative;
	}
	.circle{
		width: 100%;
		height: 100%;
		aspect-ratio: 1/1;
		border: 7px solid red;
		border-radius: 5rem;
	}
	.rect{
		width: 80%;
		height: 5%;
		background: red;	
		border-radius: 0.1rem;
	}
	.rect-1{
		transform: rotateZ(-45deg);
	}
	.rect-2{
		transform: rotateZ(45deg);
	}
</style>