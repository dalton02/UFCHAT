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
    transform: translate(0,.45rem);
    transition: all .5s;
    font-family: 'Lemands';
    pointer-events: none;
  }
  input{
    width: 100%;
    border: 2px solid var(--color4);
    border-radius: 10px;
    margin: 0;
    padding: 0;
    text-indent: 10px;
    font-family: 'Lemands';
    color:var(--color4);
    background: var(--color2);
    transition: all .5s;
    height: 2.5rem;
  }
  input:focus + label,
  input:valid + label {
  transform: translate(0,-1.5rem);
  }
  input:focus +label{
    color: var(--colorInverted);
  }
  
  input:focus{
    border: 2px solid var(--colorInverted);
    color: var(--colorInverted); 
  }


</style>
