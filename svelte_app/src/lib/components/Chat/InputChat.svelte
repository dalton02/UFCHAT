<script>
import Input from '$lib/components/Chat/Input.svelte';
import {sendMessage,receiveMessage} from '$lib/api/chat';
import {currentIdChat,chat} from '$lib/stores/chatStore.js';
	import airplane from '$lib/images/airplane.svg';


	
const handleSendMessage = async () => {
  	const conversation_id = $currentIdChat;
  	const body = currentText;
  	sendMessage(conversation_id,body);
  	currentText = '';
}


let currentText = '';


function handleInput(text){
 	currentText = text;
}
</script>

<div class="input">
<Input placeholder="Escreva sua mensagem" getText={handleInput}/>
</div>

<button class="text-xl">&#x1F4CE</button>
<button class="text-xl">&#x1F5BC</button>
<button class="text-xl">&#x1F399</button>
<button class="sendMessage" on:click={handleSendMessage}><img src={airplane}/></button>

<style>

button{
	width: 4%;
}
.sendMessage{
	background-color: var(--color4);
	border-radius: 100%;
	width: 4.5%;
	aspect-ratio: 1/1;
	position: relative;
}
.sendMessage img{
	max-width: 55%;
	max-height: 55%;
	object-fit: contain;
	position: absolute;
	transform: translate(40%,-55%);
	filter: contrast(0%) brightness(10);
}
.input{
	width: 78%;
	margin-right: 10px;
}
</style>