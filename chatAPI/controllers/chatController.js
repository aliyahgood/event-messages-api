const { db } = require('../firebase');

// GET all messages by chatID
const getMessages = async (req, res) => {
    try {
        const { chatID } = req.params; 

        // get chat data
        const chatDoc = await db.collection('chats').doc(chatID).get();

        // error if no chat exists 
        if (!chatDoc.exists) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // extract data from chat document
        const chatData = chatDoc.data();
        const messages = chatData.messages || [];

        // process array and get corresponding username from users collection
        const mappedMessages = await Promise.all(messages.map(async (msg) => {
            const { uid, text } = msg;
            const userDoc = await db.collection('users').doc(uid).get();

            return {
                username: userDoc.exists ? userDoc.data().username : 'unknown user',
                text
            };
        }));

        // map successful
        res.status(200).json(mappedMessages);

    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};

// POST by chatID
const postMessage = async (req, res) => {
    try {
        const { chatID } = req.params; 
        const { message } = req.body; 

        // VALIDATION SHOULD BE DONE IN FRONT END
        if (!message || typeof message !== 'object' || !message.uid || !message.text) {
            return res.status(400).json({ message: "Invalid or missing 'message' field" });
        }

        // extract data from chat document
        const chatRef = db.collection('chats').doc(chatID);
        const chatDoc = await chatRef.get();

        // error if no chat exists
        if (!chatDoc.exists) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // get existing messages
        const existingMessages = chatDoc.exists ? chatDoc.data().messages || [] : [];

        // append new message
        const updatedMessages = [...existingMessages, {
            uid: message.uid,
            text: message.text
        }];

        // update document
        await chatRef.update({ messages: updatedMessages });

        // successful
        res.status(200).json({ message: "Message added successfully"});

    } catch (error) {
        console.error("Error writing to Firestore:", error);
        res.status(500).json({ message: "Error writing to database", error });
    }
};

module.exports = { getMessages, postMessage };