<script>
  export let value;
  export let handleClick;
 </script>

  <button on:click={handleClick} 
  class="flex flex-row justify-center items-center content-center">
  <a class="flex flex-row justify-center items-center content-center">
    <span class="text-lg p:text-xs">{value}</span>
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
  background: var(--color4);
  cursor: pointer;
  width:100%;
  aspect-ratio: 16/4;
  transition: all .6s;
  border-radius: .8rem;
  position: relative;
  overflow: hidden;
  }
  button span{
    transition: all .6s;
    position: absolute;
    z-index: 99;
    color: var(--color2);
  }
  button::after{
    content: "";
    width: 110%;
    position: absolute;
    background: var(--color3);
    transform: translate(-100%,20%);
    transition: all .6s;
    aspect-ratio: 1/1;
    border-radius: 100%;
  }
  button:hover::after{
    transform: translate(0);
  }
  button:hover span{
    color: var(--colorInverted);
  }


@media only screen and (max-width:800px){
  button{
  }
}

@media only screen and (max-width:600px){
  button{
  }
}


</style>
