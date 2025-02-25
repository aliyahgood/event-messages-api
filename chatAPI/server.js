const express = require("express");
const chatRoutes = require("./routes/chatRoutes"); 

const app = express();

app.use(express.json()); 

app.use("/chats", chatRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
