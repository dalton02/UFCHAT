<script>
  import Switch from '$lib/components/Switch.svelte';
  import sun from '$lib/images/sun.svg';
  import moon from '$lib/images/moon.svg';
</script>

  <div class="container mx-auto px-4 py-2 flex items-center justify-between relative customNav">
    
    <!-- Logo -->
    <div>
      <p class="text-3xl font-bold">UFChat</p>
    </div>

    <!-- Links do menu -->
    <div class="lg:flex lg:items-center lg:space-x-4 relative">
      <a href="#" class="text-sm">Home</a>
      <a href="#" class="text-sm">About</a>
    </div>

  </div>
  <div class="container mx-auto px-4 pt-2 lg:flex lg:items-center lg:content-center lg:justify-start gap-5 ">
      <a><Switch myTheme="light" icon={sun}/></a>
      <a><Switch myTheme="dark" icon={moon}/></a>
    </div>
    
<style>
 div{
      font-family: 'Lemands';
    }
  @media only screen and (max-width:800px){
   
    .customNav p{
      font-size: 1.5rem;
    }
    .customNav a{
      font-size: .8rem;
    }
  }



</style>