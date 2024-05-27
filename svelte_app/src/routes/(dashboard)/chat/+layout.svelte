<script>
  import "../../app.css";
  import "$lib/fonts/fonts.css";  
  import {theme} from '$lib/stores/globalStore';

</script>

<svelte:head>
  <meta name="color-scheme" content={`${$theme}`}/>
  <link rel="stylesheet" href={`/themes/${$theme}.css`}/>
</svelte:head>

<slot />

<style>
</style>