
<div class="flex flex-row justify-center items-center container">
	<div class="circle flex flex-row justify-center items-center">
	<div class="rect rect-1 absolute"></div>
	<div class="rect rect-2 absolute"></div>
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
		background: rgb(200,50,50);
		border-radius: 10rem;
		position: relative;
		border: 1px solid black;

	}
	.rect{
		border: 1px solid black;
		width: 70%;
		height: 20%;
		background:rgb(240,200,200);	
		border-radius: 1px;
	}
	.rect-1{
		transform: rotateZ(-45deg);
	}
	.rect-2{
		transform: rotateZ(45deg);
	}
</style>