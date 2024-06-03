<script>
import {theme} from '$lib/stores/globalStore';
import '../app.css';
</script>


<svelte:head>
  <meta name="color-scheme" content={`${$theme}`}/>
  <link rel="stylesheet" href={`/themes/dark.css`}/>
</svelte:head>
<slot/>

<style>
</style>