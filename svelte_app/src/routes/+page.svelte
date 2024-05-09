<script>
	  import Nav from '$lib/components/Nav.svelte';
  	import NavSwitch from '$lib/components/NavSwitch.svelte';  
  	import Input from '$lib/components/Input.svelte';
    import Button from '$lib/components/Button.svelte';
    import image from '$lib/images/students.jpg';
	  import {loginStudent} from '$lib/api/auth.js';    
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let login = '';
    let password = '';
    // Get the value of a cookie
    //Call token and auth api's
    const handleLogin = async () =>{
    	
    	try{
      await loginStudent(login,password); 
      console.log(getCookies());
   
		  }
	  	catch(err){

      //Make components of error spawn here!!!!!
			console.log(err.message);
	   	
      }
    
    }

    function getFromLogin(text){
        login = text;
    }
    
    function getFromPassword(text){
        password = text;
    }

   function getCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      cookies[name] = value;
      return cookies;
    }, {});
  }


</script>

<NavSwitch/>

<div class="flex flex-row justify-center customContainer mb-5">

  <div class="flex flex-col justify-center items-center loginSide">
  	<div class="flex flex-col justify-center items-center mb-10">
  		<h1 class="text-3rem m-0 p-0">Faça seu Login</h1>
  		<h2 class="text-1rem">Use sua conta do SIGAA</h2>
  	</div>
  	<div class="flex flex-col justify-center gap-10">
  		<Input type="text" placeholder="Login:" value="" getText={getFromLogin}/>
  		<Input type="password" placeholder="Senha:" value="" getText={getFromPassword}/>
  		<Button handleClick={handleLogin} value="Logar" type="button" placeholder="Sua senha"/>
  	</div>
  
  </div>

  
  
</div>


<style>

.customContainer{
  font-family: 'Nexa';
}
.loginSide{padding: 5%;
}
</style>