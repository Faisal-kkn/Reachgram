import express from "express";
import user from '../controllers/authControllers.js';
const router = express.Router()

router.get('/', user.userRegister)

  
export default router;