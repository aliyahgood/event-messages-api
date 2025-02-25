const axios = require("axios");

const chatID = "lR60apxuE8JJEPFjN7La"; 
const url = `http://localhost:3000/chats/${chatID}`; 

// display all messages in the chat

// send GET request
axios.get(url)
.then(response => {
    const messages = response.data;

    // format response as username: message
    messages.forEach(({username, text}) => {
        console.log(`${username}: ${text}`);
    });
})
.catch(error => {
  console.error("Error:", error.response ? error.response.data : error.message);
});