<script>
  export let type;
  export let placeholder;
  export let value;
  export let handleClick;
  export let lupa;


  export let getText;
  function handleChange(event){   
    const text = event.target.value;
    getText(text);
  }

</script>

  {#if lupa!=null}
  
  <div class="customInput">
  <input class="searchInput text-sm"
    type={type} required placeholder={placeholder} on:input={handleChange}
  />
  <span class="flex flex-row justify-center items-center content-center"><img src={lupa}/></span>
  </div>

  {:else}
  <div class="customInput">
  <input class="normalInput text-lg"
    type={type} required placeholder={placeholder} on:input={handleChange}
  />
  </div>
  {/if}
 

<style>
  .customInput{
    width: 100%;
    position: relative;
    background: inherit;
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
    max-width: 50%;
    max-height: 50%;
    object-fit: contain;
    filter: contrast(0) brightness(100);
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
    color: var(--colorInverted); 
  }
  input::focus{
      outline: none;
      border: none;
  }
  .normalInput::placeholder{
    color: rgb(70,70,70); 
  }
  .normalInput:focus{
    color: rgb(20,20,20); 
    outline: none;
  }


  .searchInput{
      border-radius: .4rem;
      border:2px solid rgb(220,220,220);
      text-indent: 5px;
      color: white;
      padding:6px;
  }
  .searchInput::placeholder{
    color: rgb(200,200,200); 
  }
  .searchInput:focus{
    color: white; 
    border:2px solid rgb(250,250,250); 
    outline: none;
  }

</style>
