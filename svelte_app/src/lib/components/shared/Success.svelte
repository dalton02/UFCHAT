<div class="flex flex-row justify-center items-center container">
	<div class="circle flex flex-row justify-center items-center">
	<div class="absolute w-full h-full flex flex-row justify-center items-center shadow">	
	<div class="rect rect-1 absolute"></div>
	<div class="rect rect-2 absolute"></div>
	</div>
	</div>
</div>

<style>
	.container{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.circle{
		height: 100%;
		aspect-ratio: 1/1;
		background: rgb(50,200,50);
		border-radius: 10rem;
		position: relative;
		border: 1px solid black;
	}
	.shadow{
		filter: drop-shadow(1px 1px black);
	}
	.rect{
		width: 60%;
		height: 20%;
		background:rgb(200,240,200);	
		border-radius: 1px;
	}
	.rect-1{
		transform: rotateZ(-45deg) translate(14%,50%);
		z-index: 1;
	}
	.rect-2{
		width: 35%;
		transform: rotateZ(45deg) translate(-35%,60%);
		z-index: 0;
	}
</style>