<script>
	export let user;
	export let message;
	export let profile;
	export let date;



  let dateFormat = new Date(date);
  const hours = dateFormat.getHours();
  let minutes = dateFormat.getMinutes();
  if(minutes<10)
    minutes= "0"+minutes;
  dateFormat = hours+":"+minutes;

</script>

<div class="flex flex-col message">

	<div class="header">
		{user}
	</div>

	<div class="body">
		{message}
	</div>
	<div class="data">
		{dateFormat}
	</div>

  {#if user == "Você"}
  <div class="tail right">
  </div>
  {:else}
  <div class="tail left">
  </div>
  {/if}

</div>

<style>
  :root{
    --tailS: 30px;
  }
	.message{
	width:0;
    min-width: 20%;
    max-width: 60%;
    height: auto;
    border-radius:8px;
    background: var(--color4);
    color:var(--colorScheme);
    padding: 6px;
    font-family: 'Font2';
    position: relative;
    margin-top: 5px;
    gap:3px;
    box-sizing: border-box;
    flex-shrink: 1;
    flex-basis: content;
    z-index: 999;
    }

    .tail{
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 var(--tailS) var(--tailS);
      border-color: transparent transparent var(--color4) transparent;
      position: absolute;
      bottom: 0px;
      z-index: 0;
    }
    .left{
      left: -13px; 
    }
    .right{
      right: -13px;
      border-width: var(--tailS) var(--tailS) var(--tailS) 0;
    }
  .header{
    font-size:1.1rem;
    display: flex;
    justify-content: flex-start;
    text-indent: 20px;
  }
  .body{
    width: 90%;
    font-size: 1rem;
    display: flex;
    justify-content: flex-start;
    margin-left:20px;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  .data{
    position:absolute;
    top: 8px;
    right: 25px;
    font-size: .8rem;
  }

  @media only screen and (max-width:600px){
   .message{
    min-width: 40%;
   } 
  }
  @media only screen and (max-width:400px){
   .message{
    min-width: 50%;
   } 
  }
</style>