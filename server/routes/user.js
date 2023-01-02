import express from "express";
import user from '../controllers/authControllers.js';
import chat from '../controllers/chatControllers.js';
const router = express.Router()
import { upload } from './multer.js'
import { verifyUserJWT } from './auth.js'


router.get('/isUserAuth', verifyUserJWT, user.jwtCheck)
router.get('/myData', verifyUserJWT, user.myData)
router.post('/login', user.userLogin)
router.post('/signup', user.userRegister)
router.post('/otpvarification', user.userOtpVerification)
router.post('/forgotPassword', user.forgotPassword)
router.post('/newPassword', user.newPassword)
router.post('/newPost', upload.single('image'), user.newPost)
router.get('/home', verifyUserJWT, user.homePosts)
router.get('/search', verifyUserJWT, user.searchUser)
router.put('/likeordislike', verifyUserJWT, user.likeOrDisLike)
router.get('/profile', verifyUserJWT, user.myProfile)
router.get('/profiledata', verifyUserJWT, user.myProfileData)
router.put('/editProfile', verifyUserJWT, upload.single('profile'), user.updateProfile)
router.put('/updatePost', verifyUserJWT, user.updatePost)
router.delete('/deletePost', verifyUserJWT, user.deletePost)
router.put('/reportPost', verifyUserJWT, user.reportPost)
router.get('/postComments', verifyUserJWT, user.postComments)
router.post('/commentPost', verifyUserJWT, user.commentPost)
router.put('/commentLikeAndDisLike', verifyUserJWT, user.commentLikeorDisLike)
router.post('/followAndUnfollow', verifyUserJWT, user.followAndUnfollow)
router.get('/friends', verifyUserJWT, user.friends)
router.get('/onlineFriends', verifyUserJWT, user.onlineFriends)
router.get('/FollowersList', verifyUserJWT, user.FollowersList)

export default router;