<script>
import Profile from '$lib/components/login/Profile.svelte';
import {nameNormalize} from "$lib/logic/util.js";
import {theme} from '$lib/stores/globalStore';
import {devEnvironment} from '$lib/api/keys.js';
export let data;
let isAuth = data.isAuth;

const changeTheme = (myTheme) =>{
	theme.set(myTheme);
	localStorage.setItem('theme',myTheme);
}

</script>

<div class="flex flex-col justify-start gap-5 w-10/12">

{#if isAuth}

<div class="flex flex-row justify-start gap-2 w-full flex-wrap">

<div class="flex flex-col justify-center items-center content-center p-4 gap-2 p:w-full profileImg">
<Profile fromOnlineResource=true url={data.userInfo.login}/>
<label class="text-lg text-center w-full">{nameNormalize(data.userInfo.nickname)}</label>
</div>
<div class="flex flex-col gap-2 p-4">
	<label class="text-4xl text-center">{nameNormalize(data.userInfo.fullname)}</label>
	<label class="font-thin text-lg text-center">{nameNormalize(data.userInfo.course)}</label>
</div>
</div>
{/if}
<hr/>
<div class="flex flex-row justify-center w-full gap-20">
	<button class="p-8 py-4 w-40 dm" on:click={()=>changeTheme('dark')}>Dark mode</button>
	<button class="p-8 py-4 w-40 lm" on:click={()=>changeTheme('light')}>Light mode</button>
</div>

</div>
<style>
	.profileImg{
		background: var(--C2);
		border-radius: 1rem;

	}
	button{
		border-radius: 1rem;
		font-family: 'Jaro';
	}
	.dm{
		background: var(--CD);
	}

	.lm{
		background: var(--CD2);
	}

</style>