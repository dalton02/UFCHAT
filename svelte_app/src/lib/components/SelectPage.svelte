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
    <div class="flex flex-row justify-center myButton"><Button handleClick={goToPage} value="Ir para página"/></div>
  </div>


  <style>
   .pageItem{
    height: 420px;
    aspect-ratio: 3/4;
    border-radius: 16px; 
    background: rgb(247, 245, 239);
    border-radius: 16px;
    backdrop-filter: blur(1px);
    animation: move infinite linear 1.8s;
    box-shadow: 0px 5px 45px 10px rgba(0,0,0,.18);
 }
.pageImage{
  width: 100%;
  height: 70%;
  pointer-events: none;
}
.pageImage img{
  pointer-events: none;
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
