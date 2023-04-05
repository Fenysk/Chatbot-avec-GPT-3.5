<template>
    <div id="App">

        <div class="control">
            <input v-model="messageInput" type="text" @keyup.enter="sendFn" />
            <button @click="sendFn">Send</button>
        </div>

        <div v-for="(message, index) in messages" :key="index">
            <p><span class="font-bold">{{ message.role }} : </span>{{ message.content }}</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'App',

    data() {
        return {
            messageInput: 'Salut, je m\'appelle Alexis',
            messageEnAttente: '',
            messages: [],

            reponseBrutNode: '',
        }
    },

    methods: {

        sendFn() {
            this.messages.push({
                role: 'user',
                content: this.messageInput
            });
            this.messageInput = '';
            this.chatWithAPI(this.messages);
        },

        chatWithAPI(messages) {
            axios.post('http://localhost:3621/chat', {
                params: {
                    messages: messages
                }
            })
                .then(response => {
                    this.reponseBrutNode = response.data;
                    this.messages = response.data;
                    console.log(response.data);
                })
                .catch(error => {
                    this.reponseBrutNode = error;
                    console.log(error);
                })
        }
    },
}

</script>

<style scoped>
#App {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.control {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

input {
    width: 100%;
    height: 50px;
    font-size: 20px;
    padding: 0 10px;
    border: 2px solid #745ede;
}

button {
    width: 100px;
    height: 50px;
    font-size: 20px;
    background-color: #745ede;
    color: #fff;
}

p {
    font-size: 20px;
    margin: 0;
    border-bottom: 1px solid #745ede;
}
</style>
