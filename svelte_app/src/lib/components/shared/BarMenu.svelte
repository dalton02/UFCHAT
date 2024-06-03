<script>

export let handleClick;

</script>
<div class="flex flex-col p-2 justify-between bar cursor-pointer hidden p:flex" on:click={handleClick}>
<span></span>
<span></span>
<span></span>
</div>

<style>

.bar{
	width: 40px;
	height: 36px;

}
span{
	width: 100%;
	height: 10%;
	border-radius: 20px;
	background: var(--CIS10);
}

</style>