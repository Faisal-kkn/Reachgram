import express from 'express';
const router = express.Router();
import userHelpers from '../helpers/userHelpers.js';
import userRegister from '../modules/user/register.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'

export default {
    userRegister: async (req, res) => {
        try {
            // const { error } = userRegist.validate(req.body);
            // console.log(userRegist.validate);
            // if (error) {
            //     console.log('saasd');
            //     return res.status(422).json({ errors: error.details })
            // }
            let mailId = await userRegister.findOne({ email: req.body.email })
            if (!mailId) {
                userHelpers.registerUser(registerUser).then((response) => {
                    res.status(200).json(response)
                }).catch((error) => {
                    res.status(500).json({ message: error.message })
                })
            } else res.json({ msg: true })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    }
}

