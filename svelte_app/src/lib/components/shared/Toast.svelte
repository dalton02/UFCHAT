<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import Error from '$shared/Error.svelte';
  import Success from '$shared/Success.svelte';
  import PopUp from '$shared/PopUp.svelte';
  const dispatch = createEventDispatcher()
  export let type = 'error'
  export let dismissible = true
  
</script>

<article class={type} role="alert" transition:fade>
  
  <div class="wrapperIcon">
  {#if type === 'error'}
    <Error/>
  {:else if type === 'success'}
    <Success/>
  {:else if type === 'loading'}
    <Loading/>
  {/if}
  </div>

  <div class="text text-lg">
    <slot />
  </div>

  {#if dismissible}
    <button class="close" on:click={() => dispatch('dismiss')}>
     x
     </button>
  {/if}
</article>

<style>
  article {
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    margin: 0 auto 0rem auto;
    width: 320px;
    max-width: 400px;
    height:60px;
    border: 1px solid black;
   }
   .loading{
    z-index: 1000000000000;
    background: mediumslateblue;
   }
  .error {
    background: IndianRed;
  }
  .success {
    background: MediumSeaGreen;
  }
  .info {
    background: SkyBlue;
  }
  .text {
    font-family: 'Jaro';
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  .wrapperIcon{
    width: 25%;
    height: 90%;
  }
  button {
    color: white;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 auto;
    line-height: 1;
    font-size: 1rem;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
</style>