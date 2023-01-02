import express from "express";
import user from '../controllers/authControllers.js';
import chat from '../controllers/chatControllers.js';
const router = express.Router()
import { verifyUserJWT } from './auth.js'


// router.get('/isUserAuth', verifyJWT, user.jwtCheck)
router.get('/chatList',verifyUserJWT, chat.chatList)
router.get('/users',verifyUserJWT, chat.chatUsers)
router.post('/newChat',verifyUserJWT, chat.newChat)
router.post('/conversation',verifyUserJWT, chat.conversation)
router.get('/conversation',verifyUserJWT, chat.getConversation)
// router.post('/chatList', verifyJWT, chat.chatList)

export default router;