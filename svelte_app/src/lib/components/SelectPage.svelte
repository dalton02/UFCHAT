<script>

    import Button from '$lib/components/Button.svelte';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let icon;
    export let title;
    export let url;
    function goToPage(){
         goto(url);
    }

</script>
 <div class="flex flex-col justify-center items-center pageItem">
    <h1 class="text-3xl p:text-xl">{title}</h1>
    <div class="flex flex-row justify-center items-center pageImage"><img src={icon}/></div>
    <div class="w-1/2"><Button handleClick={goToPage} value="Ir para página"/></div>
  </div>


  <style>
   .pageItem{
      height: 420px;
    aspect-ratio: 3/4;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16px; 
    background: rgba(255, 255, 255, 1);
    border-radius: 16px;
    box-shadow: 0 20px 30px rgba(0, 0, 0, .2), inset 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(1px);
    border: 1px solid rgba(0, 0, 0, 0.12);
    animation: move infinite linear 1.8s;
}
.pageImage{
  width: 100%;
  height: 70%;
}
.pageImage img{
   max-width: 50%;
   max-height: 50%;
   object-fit: contain;
}

@keyframes move{
   0%{
      transform: translateY(0px);
   }
   50%{

      transform: translateY(15px);
   }
   100%{

      transform: translateY(0px);
   }
}
@media only screen and (max-width:800px){
   .pageItem{
      height: 270px;
      aspect-ratio: 3/3;
   }
}
</style>
