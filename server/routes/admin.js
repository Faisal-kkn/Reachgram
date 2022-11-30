import express from "express";
import admin from '../controllers/adminControllers.js';
const router = express.Router()
import { upload } from './multer.js'
import { AdminverifyJWT } from './auth.js'


router.get('/isAdminAuth', AdminverifyJWT, admin.jwtCheck);
router.post('/adminLogin', admin.adminLogin)
router.get('/allUsers', AdminverifyJWT, admin.allUsers)
router.put('/blockUser', AdminverifyJWT, admin.blockUser)
router.put('/unBlockUser',AdminverifyJWT, admin.unBlockUser)
router.get('/allPosts',AdminverifyJWT, admin.allPosts)
router.put('/blockPost',AdminverifyJWT, admin.blockPost)
router.put('/unBlockPost',AdminverifyJWT, admin.unBlockPost)
// router.post('/signup', user.userRegister)

export default router;