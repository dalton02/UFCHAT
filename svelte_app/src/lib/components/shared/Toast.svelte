<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import Error from '$shared/Error.svelte';

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
    padding: 0.75rem 1.5rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    margin: 0 auto 0.5rem auto;
    width: 290px;
    max-width: 400px;
    height:60px;
    border: 1px solid black;
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
    margin-left: 10px;
    font-family: 'Jaro';
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }
  .wrapperIcon{
    width: 20%;
    height: 80%;
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