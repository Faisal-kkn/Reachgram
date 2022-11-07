import express from "express";
import user from '../controllers/authControllers.js';
const router = express.Router()

router.post('/signup', user.userRegister)

  
export default router;