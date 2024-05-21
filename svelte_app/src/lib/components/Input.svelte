<script>
  export let type;
  export let placeholder;
  export let value;
  export let icon;
  export let textAlign = "left";
  export let textIndent = "55px";

  let getText;
  
  let labelDisplay='';
  if(icon==null) labelDisplay='none';

  export function getInput(){
    return getText.value;
  }


</script>


  <div class="customInput">
  <input class="focus:outline-none focus:shadow-outline text-xl" style={`text-align: ${textAlign};text-indent: ${textIndent};`}
    type={type}  placeholder={placeholder} required 
    bind:this={getText}
  />
  <label style={`display:${labelDisplay}`}><img src={icon}/></label>
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
  }
  input{
    width: 100%;
    height: 100%;
    border-radius: 30px;
    margin: 0;
    padding: 0;
    backdrop-filter: blur(1px);
    background: rgba(255,255,255,.94);
    font-family: "Font6", sans-serif;
    border:2px solid rgba(0,0,0,.80);
    transition: all .5s;
  }
  input::placeholder{
    color: rgba(0,0,0,.78);
  }
  label{
    width: 10%;
    height: 80%;
    background: none;
    border: none;

    background: none;
    border: none;
    outline: none;
  }
  label img{
    max-width: 65%;
    min-width: 65%;
    max-height: 65%;
    min-height: 65%;
    object-fit: contain;
    z-index: 99999;

    background: none;
    border: none;
    outline: none;
  }
  input:focus{
    color: var(--colorInverted); 
  }


</style>
