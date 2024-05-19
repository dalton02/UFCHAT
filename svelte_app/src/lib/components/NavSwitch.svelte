<script>
  import Switch from '$shared/Switch.svelte';
  import sun from '$lib/images/sun.svg';
  import moon from '$lib/images/moon.svg';
</script>
  
  <div class="container mx-auto px-4 pt-2 flex items-center content-center justify-start gap-5 absolute top-0">
      <a><Switch myTheme="light" icon={sun}/></a>
      <a><Switch myTheme="dark" icon={moon}/></a>
  </div>

