import express from "express";
import user from '../controllers/authControllers.js';
const router = express.Router()
import { upload } from './multer.js'
import { verifyJWT } from './auth.js'


router.get('/isUserAuth', verifyJWT, user.jwtCheck)
router.get('/myData', verifyJWT, user.myData)
router.post('/login', user.userLogin)
router.post('/signup', user.userRegister)
router.post('/otpvarification', user.userOtpVerification)
router.post('/forgotPassword', user.forgotPassword)
router.post('/newPassword', user.newPassword)
router.post('/newPost', verifyJWT, upload.single('image'), user.newPost)
router.get('/home', verifyJWT, user.homePosts)
router.get('/search', verifyJWT, user.searchUser)
router.put('/likeordislike', verifyJWT, user.likeOrDisLike)
router.get('/profile', verifyJWT, user.myProfile)
router.get('/profiledata', verifyJWT, user.myProfileData)
router.put('/editProfile', verifyJWT, upload.single('profile'), user.updateProfile)
router.put('/updatePost', verifyJWT, user.updatePost)
router.delete('/deletePost', verifyJWT, user.deletePost)
router.get('/postComments', verifyJWT, user.postComments)
router.post('/commentPost', verifyJWT, user.commentPost)
router.put('/commentLikeAndDisLike', verifyJWT, user.commentLikeorDisLike)
router.post('/followAndUnfollow', verifyJWT, user.followAndUnfollow)

export default router;