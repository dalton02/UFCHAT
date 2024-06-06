<script>
  import { theme } from '$lib/stores/globalStore';
</script>

<svelte:head>
  <meta name="color-scheme" content={$theme == 'dark' ? 'light dark' : $theme}/>
  <link rel="stylesheet" href={`/themes/${$theme}.css`}/>
</svelte:head>
<slot/>

<style>
</style>