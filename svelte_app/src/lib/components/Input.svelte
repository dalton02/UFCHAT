<script>
  export let type;
  export let placeholder;
  export let value;
  export let icon;
  
  let getText;
  
  export function getInput(){
    return getText.value;
  }
</script>


  <div class="customInput">
  <input class="focus:outline-none focus:shadow-outline text-xl"
    type={type}  placeholder={placeholder} required 
    bind:this={getText}
  />
  <label><img src={icon}/></label>
  </div>

 

<style>
  .customInput{
    width: 100%;
    height: 50px;
    position: relative;
  }
  .customInput label{
    position: absolute;
    left: 0;
    margin-left: 10px;
    transform: translate(0,11px);
    transition: all .5s;
    pointer-events: none;
    font-family: 'Lato';
    font-weight: bold;
  }
  input{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    margin: 0;
    padding: 0;
    text-indent: 55px;
    backdrop-filter: blur(10px);
    background: none;
    box-shadow: inset 0px 0px 4px 0px rgba(0,0,0,.34) , 0px 0px 10px 0px  rgba(0,0,0,.1);
    transition: all .5s;
    font-family: 'Lata';
  }
  input::placeholder{
    color: rgba(0,0,0,.78);
  }
  label{
    width: 10%;
    height: 80%;
  }
  label img{
    max-width: 65%;
    min-width: 65%;
    max-height: 65%;
    min-height: 65%;
    object-fit: contain;
    z-index: 99999;
  }
  input:focus{
    color: var(--colorInverted); 
  }


</style>
