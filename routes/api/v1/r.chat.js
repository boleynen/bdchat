const express = require('express');
const router = express.Router();
const chatController = require('../../../controllers/api/v1/c.chat.js');

// GET ALL CHATS
router.get("/", chatController.getAll);

// GET ALL CHATS IN YOUR ROOM
router.get("/:date", chatController.getChatsFromYourChatroom);

// POST CHATS
router.post("/", chatController.create);

module.exports = router;