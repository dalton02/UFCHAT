<script>
  export let type;
  export let placeholder;
  export let value;
  export let handleClick;
 
 </script>

  <div class="container flex flex-row justify-center items-center content-center">
  <button on:click={handleClick} 
  class="flex flex-row justify-center items-center content-center">
  <a class="flex flex-row justify-center items-center content-center">
    <span>{value}</span>
  </a>
  </button>
  <div class="flex flex-row justify-center items-center content-center spikes">
     <i></i>
     <i></i>
     <i></i>
     <i></i>
   </div>
  </div>
 

<style>
  :root{
    --t1:3px;
    --t2:25px;
  }
  .container{
    position: relative;
    width: 401px;
    height: 160px;
    overflow: hidden;
  }
  a{
    width: 100%;
    height: 100%;
  }
  button {
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 200px;
  aspect-ratio: 16/4;
  transition: all .3s;
  position: absolute;
  }
  button span{
    font-size: 1.2rem;
    font-family: 'Nexa';
    position: absolute;
    z-index: 99;
    transition-delay: .28s;
    color: var(--color4);
  }
  .spikes{
    position: absolute;
    width: 100%;
    height: 100%;
    animation: rotate 6s linear infinite;
  }
  .spikes i{
    position: absolute;
    background: var(--color1);
    box-shadow: 0 0 10px var(--color1),
    0 0 20px var(--color1),
    0 0 30px var(--color1),
    0 0 50px var(--color1),
    0 0 100px var(--color1);
    transition: 0.3s ease-in-out;
    border-radius: 2PX;
  }

  .spikes i:nth-child(1){
    width: var(--t2);
    height: var(--t1);
    transform: translateX(calc(-2*var(--t2)));
  }
  .spikes i:nth-child(2){
    width: var(--t2);
    height: var(--t1);
    transform: translateX(calc(2*var(--t2)));
  }

  .spikes i:nth-child(3){
    width: var(--t1);
    height: var(--t2);
    transform: translateY(calc(-2*var(--t2)));
  }
  .spikes i:nth-child(4){ 
    width: var(--t1);
    height: var(--t2);
    transform: translateY(calc(2*var(--t2)));
  }
  button:hover + .spikes i{
  transform: translate(0,0); 
  width: 0;
  height: 0;
  }

  button:hover span{
    color:var(--color2);
  }
  button::before{
    content:"";
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(--color1);
    transform: scale(0);
    transition: 0.3s;
    border-radius: 1rem;
  }
  button:hover::before{
    transition-delay: .25s;
    transform: scale(1);
  }

@keyframes rotate{
  from{
    transform: rotateZ(0deg);
  }
  to{
    transform: rotateZ(360deg);
  }
}

@media only screen and (max-width:800px){
  button{
    width: 200px;
  }
}

@media only screen and (max-width:600px){
  button{
    width: 180px;
  }
}


</style>
