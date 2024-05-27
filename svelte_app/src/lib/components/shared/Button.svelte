<script>
  export let value;
  export let handleClick;
  export let width = '160px';
  export let height = '40px';


 </script>

  <button on:click={handleClick} 
  class="flex flex-row justify-center items-center content-center" style={`height: ${height};width:${width};`}>
  <a class="flex flex-row justify-center items-center content-center">
    <span class="text-xl">{value}</span>
  </a>
  </button>

 

<style>


  .container{
    position: relative;
    overflow: hidden;
  }
  a{
    width: 100%;
    height: 100%;
  }
  button {
  appearance: none;
  background: var(--CD);
  font-family: "Font2", sans-serif;
  cursor: pointer;
  transition: all .6s;
  border-radius: .5rem;
  position: relative;
  overflow: hidden;
  }
  button span{
    transition: all .6s;
    position: absolute;
    z-index: 99;
    color: var(--CIS10);
  }
  button::after{
    content: "";
    width: 110%;
    position: absolute;
    background: var(--CD2);
    transform: translate(-100%,20%);
    transition: all .6s;
    aspect-ratio: 1/1;
    border-radius: 100%;
  }
  button:hover::after{
    transform: translate(0);
  }
  button:hover span{
    color: var(--CS10);
  }




</style>
