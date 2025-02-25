const axios = require("axios");

const chatID = "lR60apxuE8JJEPFjN7La"; // Hardcoded chat ID
const url = `http://localhost:3000/chats/${chatID}`; 

// get input from CLI (your actual program will just need to dynamically populate the user and message variables)
// validation should be done here


const user = 'LhiZknBYXixpvG814wsV'
const message = 'Hey there!'

// data to send 

const data = {
    message: 
        {uid: user, text: message}
};

// sent post request

axios.post(url, data)
  .then(response => {
    console.log("Response:", response.data);
  })
  .catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });






