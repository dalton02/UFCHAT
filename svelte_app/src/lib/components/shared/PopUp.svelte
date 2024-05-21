<script>
    import Loading from '$shared/Loading.svelte';
    import Error from '$shared/Error.svelte';
    import Button from '$lib/components/Button.svelte'

    export let type;
    export let customText;
    let popUp;
    let loading;
    //PopUp tem duas classes: PopUp para spinners que desaparecem automaticamente
    //PopUp para telas de aviso que são fechadas no clique de botao      
    
    export function exitPop(){
        popUp.style.display = "none";
    }
    export function displayPop(){
        popUp.style.display = "flex";
    }
    export function setCustomText(text){
        customText = text;
    }

</script>



{#if type=="loading"}

<div class="flex flex-col justify-center items-center content-center popUp text-lg" bind:this={popUp}>
 <Loading bind:this={loading}/>
 {customText}
</div>

{:else if type=="error"}

<div class="flex flex-row justify-center items-center content-center popUp gap-2 text-lg" bind:this={popUp}>
 <Error/>
 {customText}
</div>

{/if}

<style>
    .popUp {
        height: 200px;
        width: 420px;
        position: absolute;
        z-index: 9999999999999;
        background: rgba(255, 255, 255, 1);
        border-radius: 16px;
        box-shadow: 0 20px 30px rgba(0, 0, 0, .2), inset 0px 0px 5px 0px rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
        font-family: 'Jaro';
        display:none;
        padding: 10px;
    }
    .iconPop{
        width: 15%;
    }
</style>
