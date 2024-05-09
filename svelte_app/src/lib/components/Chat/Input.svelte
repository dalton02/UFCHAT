<script>
  export let type;
  export let placeholder;
  export let value;
  export let handleClick;
</script>


  <div class="customInput">
  <input class="focus:outline-none focus:shadow-outline text-2xl"
    type={type} required placeholder={placeholder} 
  />
  </div>

 

<style>
  .customInput{
    width: 90%;
    position: relative;
    background: inherit;
  }
  input{
    width: 100%;
    border-radius: .2rem;
    margin: 0;
    padding: 0;
    text-indent: 10px;
    font-family: 'Lemands';
    color: var(--colorInverted); 
    background: none;
    transition: all .5s;
  }
  
  input:focus{
    color: var(--color1); 
  }



</style>
