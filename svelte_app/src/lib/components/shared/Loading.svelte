<script>

    
</script>


<span class="loader"></span>

<style>
    :root{
        --speed: 0.6s;
    }
    .loader {
    width: 20%;
    aspect-ratio: 1/1;
    border: 14px solid var(--color4);
    border-bottom-color: var(--color3);
    border-radius: 100%;
    display: inline-block;
    box-sizing: border-box;
    animation: var(--speed) linear 0s infinite normal none running rotation;
    }
    
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>