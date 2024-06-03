<script>
	export let user;
	export let message;
	export let profile;
	export let date;

  let tail;
  let dataPos;
  let dateFormat = new Date(date);
  const hours = dateFormat.getHours();
  let minutes = dateFormat.getMinutes();
  if(minutes<10)
    minutes= "0"+minutes;
  dateFormat = hours+":"+minutes;

  if(user=="Você"){
    tail = '20px 35px 3px 35px';
    dataPos = '0%';
  }
  else{
    tail = '35px 20px 35px 3px';
    dataPos = '2%';
  }
</script>


<div class="wrapper">
<div class="flex flex-col message" 
style="--tail:{tail};"
>

	<div class="header text-xs">
		{user}
	</div>

	<div class="body text-2sm">
		{message}
	</div>

</div>
  <div class="data text-.5xs" style="--dataPos:{dataPos};" class:left={user=="Você"}>
    {dateFormat}
  </div>

</div>

<style>
  :root{
  }
  .wrapper{
    width:0;
    height: auto;
    min-width: 10%;
    max-width: 70%;
    box-sizing: border-box;
    flex-shrink: 1;
    flex-basis: content;
    z-index: 999;
    margin-top: 8px;
    margin-bottom: 8px;
  }
	.message{
    width: 100%;
    height: 95%;
    padding: 10px;
    padding-bottom: 0;
    padding-right:30px;
    font-family: 'Lato';
    position: relative;
    border-radius: var(--tail);
    z-index: 0;
    overflow: hidden;
    background: var(--CIS10);
    color: var(--CS10);
    }

  .header{
    display: flex;
    justify-content: flex-start;
    text-indent: 1rem;
    z-index: 99999
  }
  .body{
    width: 95%;
    display: flex;
    justify-content: flex-start;
    margin-top: .1rem;
    margin-left:1rem;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
    z-index: 999;
    padding: 0;
  }
  .data{
    position:relative;
    color: var(--CIS10);
    transform: translateX(var(--dataPos));
    z-index: 99;
  }
  .left{
    transform: translate(-2rem);
    left: 100%;
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