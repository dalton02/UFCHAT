<script>
	  import NavSwitch from '$lib/components/NavSwitch.svelte';  
  	import Input from '$lib/components/Input.svelte';
    import Button from '$lib/components/Button.svelte';
    import SelectPage from '$lib/components/SelectPage.svelte';
	  import {loginStudent} from '$lib/api/auth.js';    
    import chatIcon from "$lib/images/chatIcon.svg";
    import newsIcon from '$lib/images/newspaper.svg'
    import PopUp from '$shared/PopUp.svelte';
    import loginIcon from '$image/login.svg';
    import keyIcon from '$image/key.svg';
    import { addToast } from "$store/globalStore.js";
    import Toaster from '$shared/Toaster.svelte';
   
    let loginElement;
    let pageElement;
    let loadingElement;
    let errorElement;

    let login;
    let password;

    const handleLogin = async () =>{
    	
      try{
      loadingElement.displayPop();
      loginElement.style.display = 'none';
      await loginStudent(login.getInput(),password.getInput()); 
      loadingElement.exitPop();
      pageElement.style.display = 'flex';
		  }
	  	
      catch(err){
      
      let errMessage='Usuário/Senha incorretos';
      if (err.message == 'Failed to fetch')
          errMessage = 'Servidor fora do ar'

      addToast({
        message: errMessage,
        type: "error",
        dismissible: true,
        timeout: 2000,
      });

      loadingElement.exitPop();
      loginElement.style.display = 'flex';
      
      }
    
    }

   


</script>

<NavSwitch/>
<Toaster/>

<div class="flex flex-row justify-center content-start items-start customContainer">


  <div class="flex flex-col justify-center items-center loginSide" bind:this={loginElement}>
  	
    <div class="flex flex-row items-center justify-center absolute">
    <PopUp type="loading" customText="Aguarde enquanto preparamos tudo" bind:this={loadingElement}/>
    </div>
    
    <div class="flex flex-col justify-center items-center mb-10 w-full">
  		<h1 class="text-5xl text-center m-0 p-0">Bem vindo estudante</h1>
  		<h2 class="text-sm m-0">Use sua conta do SIGAA</h2>
  	</div>
  	<div class="flex flex-col justify-center items-center w-full" style="gap:3rem;">
  		<Input type="text" icon={loginIcon} placeholder="Seu usuário" value="" bind:this={login}/>
  		<Input type="password" icon={keyIcon} placeholder="Sua senha" value="" bind:this={password}/>
  		
      <div class="w-1/2"><Button handleClick={handleLogin} value="Logar"/></div>
  	</div>
  </div>

</div>

  <div class="flex flex-row justify-center items-center content-start gap-20 pageChoose p:gap-10" 
  bind:this={pageElement}>
  
  <SelectPage icon={chatIcon} title="Bate Papo Online" url="/chat"/>
  <SelectPage icon={newsIcon} title="Jornal UFCA" url="/"/>

  </div>
<style>

.pageChoose{
  width: 100vw;
  height: 80dvh;
  font-family: "Jaro", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  flex-wrap: wrap;
  display: none;
}

.customContainer{  
  font-family: "Jaro", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  width: 100vw;
  height: 80dvh;
  }
.loginSide{
  height:470px;
  aspect-ratio: 10/8;
  padding: 3%;
  position: relative;
  background: rgba(255, 255, 255, 0.89);
  border-radius: 2rem;
  box-shadow: 0 30px 30px rgba(0, 0, 0, .2), inset -10px -15px 100px -50px rgba(0, 0, 0, .1);
  backdrop-filter: blur(2px);
  border: 1px solid rgba(0, 0, 0, 0.12);
 }
 @media only screen and (max-width:800px){
  
 }
</style>