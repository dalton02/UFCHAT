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
    <h1 class="text-3xl">{title}</h1>
    <div class="flex flex-row justify-center items-center pageImage"><img src={icon}/></div>
    <div class="w-1/2"><Button handleClick={goToPage} value="Ir para página"/></div>
  </div>


  <style>
   .pageItem{
   width: 360px;
  aspect-ratio: 3/3;
  background: red;
  padding: 2%;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  box-shadow: 0 40px 30px 4px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.12);
  animation: move infinite linear 1.8s;
}
.pageImage{
  height: 300px;
  width: 100%;
}
.pageImage img{
   max-width: 50%;
   max-height: 50%;
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
</style>
