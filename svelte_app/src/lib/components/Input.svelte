<script>
  export let type;
  export let placeholder;
  export let value;
  export let getText;

  function handleChange(event){   
    const text = event.target.value;
    getText(text);
  }

</script>


  <div class="customInput">
  <input class="focus:outline-none focus:shadow-outline text-lg"
    type={type} on:input={handleChange} required 
  />
  <label class="text-lg">{placeholder}</label>
  </div>

 

<style>
  .customInput{
    width: 100%;
    position: relative;
  }
  .customInput label{
    position: absolute;
    left: 0;
    margin-left: 10px;
    transform: translate(0,.4rem);
    transition: all .5s;
    pointer-events: none;
    font-family: 'Ubuntu';
    font-weight: bold;
  }
  input{
    width: 100%;
    border-radius: 10rem;
    margin: 0;
    padding: 0;
    text-indent: 10px;
    backdrop-filter: blur(10px);
    background: none;
    box-shadow: inset 0px -10px 10px -7px rgba(0,0,0,.2) , -7px 5px 20px 0px  rgba(0,0,0,.3);
    transition: all .5s;
    height: 2.5rem;
    font-family: 'Ubuntu';
    
  }
  input:focus + label,
  input:valid + label {
  transform: translate(0,-1.8rem);
  }
  input:focus +label{
    color: var(--colorInverted);
  }
  
  input:focus{
    color: var(--colorInverted); 
  }


</style>
