<script>

    import { tick } from 'svelte'
import Input from '$lib/components/chat/Input.svelte';
import {sendMessage,receiveMessage} from '$lib/api/chat';
import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import airplane from '$lib/images/airplane.svg';


	
const handleSendMessage = async () => {
  	const conversation_id = $currentIdChat;
  	const body = currentText;
  	sendMessage(conversation_id,body);
  	currentText = '';
  	await tick();
 	myInput.empty();
}


let currentText = '';
let myInput;

function handleInput(text){
 	currentText = text;
}
</script>

<div class="input">
<Input placeholder="Escreva sua mensagem" bind:this={myInput} type="text" getText={handleInput}/>
</div>

<button class="text-xl">&#x1F4CE</button>
<button class="text-xl">&#x1F5BC</button>
<button class="text-xl">&#x1F399</button>
<button class="sendMessage"  on:click={handleSendMessage}><img src={airplane}/></button>

<style>

button{
	width: 4%;
}
.sendMessage{

		background-color: var(--CS10);
	border-radius: 100%;
	width: 40px;
	aspect-ratio: 1/1;
	position: relative;
	overflow: hidden;
}
.sendMessage:after{
    content: "";
    width: 160%;
    left: 0;
    top: 0;
    position: absolute;
   	background-color: var(--CD);
    transform: translate(-100%,20%);
    transition: all .6s;
    aspect-ratio: 1/1;
    border-radius: 100%;
    z-index: 9;
}
.sendMessage:hover::after{
    transform: translate(-15%,-10%);

}
.sendMessage:hover img{
	filter: contrast(var(--BG)) brightness(calc(var(--CT) * 1000 ));
}
.sendMessage img{
	max-width: 60%;
	max-height: 60%;
	object-fit: contain;
	position: absolute;
	transform: translate(35%,-55%);
	filter: contrast(var(--CT)) brightness(var(--BG));
	z-index: 999999;
    transition-delay: .3s;
}
.input{
	width: 78%;
	margin-right: 10px;
}
</style>