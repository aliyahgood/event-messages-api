const express = require('express');
const { getMessages, postMessage } = require('../controllers/chatController'); 
const router = express.Router();

// routes
router.get('/:chatID', getMessages); 
router.post('/:chatID', postMessage); 

module.exports = router;