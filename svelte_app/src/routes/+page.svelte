<script>
	  import NavSwitch from '$lib/components/NavSwitch.svelte';  
  	import Input from '$lib/components/Input.svelte';
    import Button from '$lib/components/Button.svelte';
    import SelectPage from '$lib/components/SelectPage.svelte';
	  import {loginStudent} from '$lib/api/auth.js';    
    import Loading from '$lib/components/Loading.svelte';
    import Error from '$lib/components/Error.svelte';
    import chatIcon from "$lib/images/chatIcon.svg";
    import newsIcon from '$lib/images/newspaper.svg'
    
    let login = '';
    let password = '';
    
    let loginElement;
    let pageElement;
    let loadingElement;
    let errorElement;
    const exitPop = async ()=>{

      loadingElement.style.display = 'none';
      errorElement.style.display = 'none';
     
    }
    const handleLogin = async () =>{
    	
    	try{
      loadingElement.style.display = 'flex';
      loginElement.style.display = 'none';
      await loginStudent(login,password); 
      loadingElement.style.display = 'none';
      pageElement.style.display = 'flex';
		  }
	  	
      catch(err){
      
      loadingElement.style.display = 'none';
      errorElement.style.display = 'flex';
      loginElement.style.display = 'flex';
      
      console.log("Login/senha incorretos");
	   	
      }
    
    }

    function getFromLogin(text){
        login = text;
    }
    
    function getFromPassword(text){
        password = text;
    }

   


</script>

<NavSwitch/>

<div class="flex flex-row justify-center customContainer mt-5">

  <div class="flex flex-row justify-center items-center content-center popUp mt-10"bind:this={loadingElement}>
  <Loading/>
  </div>

  <div class="flex flex-col gap-5 justify-center items-center 
  text-xl
  content-center popUp popError mt-10" bind:this={errorElement}>
<Error/>
  Usuario/senha incorreto(s)

   <div class="w-1/2"><Button handleClick={exitPop} value="Certo"/></div>
  </div>


  <div class="flex flex-col justify-center items-center loginSide" bind:this={loginElement}>
  	<div class="flex flex-col justify-center items-center mb-10 w-full">
  		<h1 class="text-5xl text-center m-0 p-0">Bem vindo estudante</h1>
  		<h2 class="text-sm m-0">Use sua conta do SIGAA</h2>
  	</div>
  	<div class="flex flex-col justify-center items-center w-full" style="gap:3rem;">
  		<Input type="text" placeholder="Login:" value="" getText={getFromLogin}/>
  		<Input type="password" placeholder="Senha:" value="" getText={getFromPassword}/>
  		
      <div class="w-1/2"><Button handleClick={handleLogin} value="Logar"/></div>
  	</div>
  
  </div>

  <div class="flex flex-row flex-wrap justify-center items-center content-center mt-5 gap-20 pageChoose" 
  bind:this={pageElement}>
  
  <SelectPage icon={chatIcon} title="Bate Papo Online" url="/chat"/>
  <SelectPage icon={newsIcon} title="Jornal UFCA" url="/"/>

  </div>

  
  
</div>


<style>

  .popUp{
    width: 400px;
    aspect-ratio: 1/1;
    position: absolute;
    z-index: 1;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4px);
    display: none;
  }
.pageChoose{
  width: 80%;
  height: 100%;
  display: none;
}

.customContainer{  
  font-family: "Jaro", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
 }
.loginSide{
  padding: 5%;
  width:570px;
  position: relative;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.40);
  border-radius: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.12);
 }

 @media only screen and (max-width:1000px){
    .loginSide{
      width: 500px;
    }
 }
 @media only screen and (max-width:800px){
    .loginSide{
      width: 450px;
    }
 }
</style>