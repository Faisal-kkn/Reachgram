import express from "express";
import admin from '../controllers/adminControllers.js';
const router = express.Router()
import { upload } from './multer.js'
import { verifyAdminJWT } from './auth.js'


router.post('/adminLogin', admin.adminLogin)
router.get('/isAdminAuth', verifyAdminJWT, admin.jwtCheck);
router.get('/allUsers', verifyAdminJWT, admin.allUsers)
router.put('/blockUser', verifyAdminJWT, admin.blockUser)
router.put('/unBlockUser',verifyAdminJWT, admin.unBlockUser)
router.get('/allPosts',verifyAdminJWT, admin.allPosts)
router.put('/blockPost',verifyAdminJWT, admin.blockPost)
router.put('/unBlockPost',verifyAdminJWT, admin.unBlockPost)
// router.post('/signup', user.userRegister)

export default router;