import express from "express";
import user from '../controllers/authControllers.js';
import chat from '../controllers/chatControllers.js';
const router = express.Router()
import { verifyJWT } from './auth.js'


// router.get('/isUserAuth', verifyJWT, user.jwtCheck)
router.get('/chatList', chat.chatList)
router.get('/users', chat.chatUsers)
router.post('/newChat', chat.newChat)
router.post('/conversation', chat.conversation)
router.get('/conversation', chat.getConversation)
// router.post('/chatList', verifyJWT, chat.chatList)

export default router;