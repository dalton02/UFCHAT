<script>
	  import NavSwitch from '$lib/components/NavSwitch.svelte';  
  	import Input from '$lib/components/Input.svelte';
    import Button from '$lib/components/Button.svelte';
    import SelectPage from '$lib/components/SelectPage.svelte';
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
  
    let loginElement;
    let pageElement;
    let loadingElement;
    let errorElement;
    let welcomeElement;
    let rulesElement;
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
      }
    
    }

    const handleWelcome = async ()=> {
    
    try{
    loadingElement.displayPop();
    
    await changeNickStudent(nick.getInput());
    
    loadingElement.exitPop();
    
    welcomeElement.style.display="none";
    rulesElement.style.display = 'flex';
    
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

    const goToSelection = async ()=>{
      rulesElement.style.display='none';
      pageElement.style.display = "flex";
    }


</script>

<Toaster/>

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
  		
      <div class="w-1/2 text-xl"><Button handleClick={handleLogin} value="Logar"/></div>
  	</div>
  </div>

  <div class="flex flex-row justify-center items-center content-start gap-20 pageChoose p:gap-10" 
  bind:this={pageElement}>
  
  <SelectPage icon={chatIcon} title="Bate Papo Online" url="/chat"/>
  <SelectPage icon={newsIcon} title="Jornal UFCA" url="/"/>

  </div>
  
  <div class="flex flex-col justify-center items-center containerDesign welcomeBoard" bind:this={welcomeElement}>
    <div class="w-full flex justify-center headerImg absolute">
      <img src={partyIcon} class="pop1"/>
      <img src={partyIcon} class="pop2"/>
    </div>
    <div class="flex flex-col justify-center items-center mb-10 w-full">
      <h1 class="text-5xl text-center m-0 p-0">Boas vinda a nossa plataforma</h1>
        </div>
    <div class="flex flex-col justify-center items-center w-full" style="gap:3rem;">
      <Input type="text" textAlign="center" textIndent=0 placeholder="Insira aqui seu apelido" value="" bind:this={nick}/>
      
      <div class="w-1/2 text-xl"><Button handleClick={handleWelcome} value="Continuar"/></div>
    </div>
  </div>

  <div class="flex flex-col justify-start items-center containerDesign rulesBoard gap-5 text-lg" bind:this={rulesElement}>
  <h1 class="text-4xl">Diretrizes de Uso da Rede Social</h1>
        <p class="guideline">1. Respeite a diversidade de opiniões e pessoas.</p>
        <p class="guideline">2. Evite conteúdo sensível ou explícito.</p>
        <p class="guideline">3. Não compartilhe informações pessoais sensíveis de terceiros.</p>
        <p class="guideline">4. Seja cortês e respeitoso em suas interações.</p>
        <p class="guideline">5. Não publique spam ou conteúdo enganoso.</p>

      <div class="w-1/2 text-sm"><Button width='250px' height='50px' handleClick={goToSelection} value="Estou de acordo com os termos"/></div>
  </div>


   <div class="absolute flex flex-col justify-start items-center content-center confetti">
    {#if explosion}
    <Confetti noGravity=true duration=3000 x={[-10, 10]} y={[-10,10]} xSpread=20 amount=900 size=15 />
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
  .containerDesign{
  padding: 3%;
  position: relative;
  background: rgb(247, 245, 239);
  border-radius: 1rem;
  backdrop-filter: blur(2px);
  z-index: 1000;
  box-shadow: 0px 5px 45px 10px rgba(0,0,0,.18);
  
  }

  .headerImg{
    height: 100%;
    opacity: 1;
    z-index: -100000;
  }
  .headerImg .pop1{
    object-fit: contain;
    max-width: 80%;
    max-height: 150px;
    top:-20%;
    transform: rotateZ(-90deg);
    left: -20%;
    position: absolute;
    z-index: -1000;
    animation: wiggle1 2s linear infinite;
  }
  .pop2{
    object-fit: contain;
    max-width: 80%;
    max-height: 150px;
    top:-20%;
    transform: rotateZ(0deg);
    right: -20%;
    z-index: -10;
    position: absolute;
    animation: wiggle2 2s linear infinite;
  }
  
.loginSide{
  height:470px;
  aspect-ratio: 10/8;

  }
  .welcomeBoard{
    height: 450px;
    width:540px;
  z-index: 100;
  display: none;
  }
  .rulesBoard{
    height: 450px;
   font-family: 'Jaro', sans-serif;
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