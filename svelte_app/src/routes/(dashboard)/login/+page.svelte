<script>
		import Input from '$lib/components/login/Input.svelte';
    import Button from '$shared/Button.svelte';
	  import {loginStudent,changeNickStudent} from '$lib/api/auth.js';    
    import chatIcon from "$lib/images/chatIcon.svg";
    import newsIcon from '$lib/images/newspaper.svg'
    import PopUp from '$shared/PopUp.svelte';
    import loginIcon from '$image/login.svg';
    import keyIcon from '$image/key.svg';
    import partyIcon from '$image/party.svg';
    import { addToast } from "$store/globalStore.js";
    import Toaster from '$shared/Toaster.svelte';
    import { Confetti } from "svelte-confetti"
    import Background from '$shared/Background.svelte';
    import {goto} from '$app/navigation';
    let loginElement;
    let loadingElement;
    let welcomeElement;
    let explosion = false;

    let login;
    let password;
    let nick;


    const handleLogin = async () =>{
    	
      try{
      loadingElement.displayPop();
      
      const status = await loginStudent(login.getInput(),password.getInput()); 
      
      addToast({
        message: "Login bem sucedido",
        type: "success",
        dismissible: true,
        timeout: 2500,
      });

      loadingElement.exitPop();
      loginElement.style.display = 'none';

      //New user welcome
      if(status==201){
        welcomeElement.style.display="flex";
        explosion=true;
        return;
      }

      goto('/',{invalidateAll:true});
      
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
      }
    
    }

    const handleWelcome = async ()=> {
    
    try{
    loadingElement.displayPop();
    
    await changeNickStudent(nick.getInput());
    
    loadingElement.exitPop();
    
    welcomeElement.style.display="none";
    
    }
    catch(err){
    
      addToast({
        message: 'Apelido já existe',
        type: "error",
        dismissible: true,
        timeout: 2000,
      });
    
    }

    }



</script>

<Toaster/>
<Background/>
<div class="flex flex-row justify-center content-center items-center customContainer">

  <div class="flex flex-row items-center justify-center absolute">
    <PopUp type="loading" customText="Aguarde enquanto preparamos tudo" bind:this={loadingElement}/>
  </div>    
    
  <div class="flex flex-col justify-center items-center containerDesign loginSide" bind:this={loginElement}>
    

    <div class="flex flex-col justify-center items-center mb-10 w-full">
  		<h1 class="text-5xl text-center m-0 p-0">Bem vindo estudante</h1>
  		<h2 class="text-lg m-0 subTitle">Use sua conta do SIGAA</h2>
  	</div>
  	<div class="flex flex-col justify-center items-center w-full" style="gap:3rem;">
  		<Input type="text" icon={loginIcon} placeholder="Seu usuário" value="" bind:this={login}/>
  		<Input type="password" icon={keyIcon} placeholder="Sua senha" value="" bind:this={password}/>
  		<Button handleClick={handleLogin} value="Logar"/>
  	</div>
  </div>

  <div class="flex flex-col justify-center items-center containerDesign welcomeBoard" bind:this={welcomeElement}>
    <div class="flex flex-col justify-center items-center content-center mb-10 w-full">
      <h1 class="text-5xl text-center m-0 p-0">Boas vinda a nossa plataforma</h1>
        </div>
    <div class="flex flex-col justify-center items-center w-full" style="gap:3rem;">
      <Input type="text" textAlign="center" textIndent=0 placeholder="Insira aqui seu apelido" value="" bind:this={nick}/>
      
      <Button handleClick={handleWelcome} value="Continuar"/>
    </div>
  </div>


   <div class="absolute flex flex-col justify-start items-center content-center confetti">
    {#if explosion}
    <Confetti noGravity=true duration=1400 iterationCount=3 x={[-8, 8]} y={[-8,8]} xSpread=20 amount=900 size=15 />
    {/if}
    </div>


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
.subTitle{
  font-family: 'Jaro', sans-serif;
  z-index: 1000;
}

.customContainer{  
  font-family: "Font4", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  width: 100vw;
  height: 80dvh;
  z-index: 100;
  }
  .confetti{
    width: 100%;
    height: 100%;
    z-index: 0;
    top:250px;
    pointer-events: none;
  }

.loginSide{
  width: 100%;
  max-width: 450px;
  }
  .welcomeBoard{
  width: 100%;
  max-width: 450px;
  z-index: 100;
  position: relative;
  display: none;
  }

  @keyframes wiggle2{
    0%{
    transform: rotateZ(0deg) scale(1);
    }
    25%{
    transform: rotateZ(-10deg) scale(1.1);  
    }
    50%{
    transform: rotateZ(0deg) scale(1.2);
    }
    75%{
      transform: rotateZ(10deg) scale(1.1);
    }
    100%{
    transform: rotateZ(0deg) scale(1.0);
    }
  }

  @keyframes wiggle1{
    0%{
    transform: rotateZ(-90deg) scale(1);
    }
    25%{
    transform: rotateZ(-100deg) scale(1.1);  
    }
    50%{
    transform: rotateZ(-90deg) scale(1.2);
    }
    75%{
      transform: rotateZ(-80deg) scale(1.1);
    }
    100%{
    transform: rotateZ(-90deg) scale(1.0);
    }
  }

</style>