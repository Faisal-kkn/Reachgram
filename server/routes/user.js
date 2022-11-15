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
router.get('/profile', verifyJWT, user.myProfile)
router.get('/profiledata', verifyJWT, user.myProfileData)
router.put('/edit_profile', verifyJWT, upload.single('profile'), user.updateProfile)
router.put('/update_post', verifyJWT, user.updatePost)
router.delete('/delete_post', verifyJWT,  user.deletePost)

export default router;