import express from "express";
import user from '../controllers/authControllers.js';
const router = express.Router()
import {upload} from './multer.js'
import {verifyJWT} from './auth.js'


router.get('/isUserAuth', verifyJWT, user.jwtCheck)
router.post('/login', user.userLogin)
router.post('/signup', user.userRegister)
router.post('/otpvarification', user.userOtpVerification)
router.post('/new_post', verifyJWT, upload.single('image'), user.newPost)
router.get('/home', verifyJWT, user.homePosts)
router.put('/likeordislike', verifyJWT, user.likeOrDisLike)
router.put('/profile', verifyJWT, user.myProfile)

export default router;