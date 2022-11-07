import express from "express";
import user from '../controllers/authControllers.js';
const router = express.Router()

const verifyAdminJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.json({ auth: false, message: "We need a token, please give it to us next time" });
    } else {
        jwt.verify(token, "adminToken", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                next();
            }
        });
    }
};

router.post('/signup', user.userRegister)
router.post('/otpvarification', user.userOtpVerification)
router.post('/login', user.userLogin)

  
export default router;