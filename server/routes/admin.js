import express from "express";
import admin from '../controllers/adminControllers.js';
const router = express.Router()
import { upload } from './multer.js'
import { AdminverifyJWT } from './auth.js'


// router.get('/isUserAuth');
router.get('/allUsers', admin.allUsers)
router.put('/blockUser', admin.blockUser)
router.put('/unBlockUser', admin.unBlockUser)
router.get('/allPosts', admin.allPosts)
router.put('/blockPost', admin.blockPost)
router.put('/unBlockPost', admin.unBlockPost)
// router.post('/login', user.userLogin)
// router.post('/signup', user.userRegister)

export default router;