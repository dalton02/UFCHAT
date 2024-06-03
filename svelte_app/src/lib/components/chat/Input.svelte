<script>
  export let type;
  export let placeholder;
  export let value;
  export let lupa;
  export let getText;

  let inputV;

  function handleChange(event){   
    const text = event.target.value;
    getText(text);
  }

  export function empty(){
    inputV.value='';
  }

</script>

  {#if lupa!=null}
  
  <div class="customInput">
  <input bind:this={inputV} class="searchInput text-sm"
    type={type} required placeholder={placeholder} on:input={handleChange}
  />
  <span class="flex flex-row justify-center items-center content-center"><img src={lupa}/></span>
  </div>

  {:else}
  <div class="customInput">
  <input class="normalInput text-lg"
    type={type} bind:this={inputV} required placeholder={placeholder} on:input={handleChange}
  />
  </div>
  {/if}
 

<style>
  .customInput{
    width: 100%;
    position: relative;
    background: none;
  }

  span{
    position: absolute;
    width: 10%;
    height: 100%;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
  span img{
    position: relative;
    width: 18px;
    transform: translateY(7px);
    object-fit: contain;
    filter: contrast(var(--BG)) brightness(var(--CT));
  }
  input{
    width: 100%;
    margin: 0;
    padding: 0;
    text-indent: 10px;
    font-family: 'Lato';
    color: rgb(170,170,170); 
    background: none;
    transition: all .5s;
    padding:1px;
    color: var(--CS10); 
  }
  input::focus{
      outline: none;
      border: none;
  }
  .normalInput::placeholder{
    color: var(--CS10);
  }
  .normalInput:focus{
    color: var(--CS10);
    outline: none;
  }


  .searchInput{
      border-radius: .4rem;
      border:2px solid var(--CS10);
      text-indent: 5px;
       color: var(--CS10);
      padding:6px;
  }
  .searchInput::placeholder{
    color: var(--CS10);
  }
  .searchInput:focus{
    color: var(--CS10);
    border:2px solid var(--CS10);
    outline: none;
  }

</style>
