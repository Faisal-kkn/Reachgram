import express from 'express';
const router = express.Router();
import userRegisterSchema from '../modules/user/register.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export default {
    userRegister: async (req, res) => {
        try {
            let mailId = await userRegisterSchema.findOne({ email: req.body.email })
            let otp;

            async function main() {
                otp = Math.random();
                otp = otp * 1000000;
                otp = parseInt(otp)

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.ADMIN_MAIL_ID,
                        pass: process.env.ADMIN_PASSWORD,
                    },
                });

                let info = await transporter.sendMail({
                    from: process.env.ADMIN_MAIL_ID, // sender address
                    to: req.body.email, // list of receivers
                    subject: "OTP Varification", // Subject line
                    text: "OTP", // plain text body
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                });

                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            
            if (mailId) {
                if (!mailId.otpStatus) {
                    main().then(async (status) => {
                        otp = otp.toString()
                        req.body.otp = await bcrypt.hash(otp, 10)
                        req.body.password = await bcrypt.hash(req.body.password, 10)
                        req.body.phone = parseInt(req.body.phone)
                        userRegisterSchema.findOneAndUpdate({ email: req.body.email }, {
                            $set: {
                                fname: req.body.fname,
                                lname: req.body.lname,
                                phone: req.body.phone,
                                email: req.body.email,
                                password: req.body.password,
                                otp: req.body.otp
                            }
                        }).then(() => {
                            res.status(200).json({ signup: true })
                        }).catch(console.error);
                    }).catch(console.error);
                } else {
                    res.status(400).json({ signup: false, msg: 'mail is already registered' })
                }
            } else {
                main().then(async (status) => {
                    otp = otp.toString()
                    req.body.otp = await bcrypt.hash(otp, 10)
                    req.body.password = await bcrypt.hash(req.body.password, 10)
                    req.body.phone = parseInt(req.body.phone)
                    let registerUser = new userRegisterSchema(req.body)
                    registerUser.save().then(() => {
                        res.status(200).json({ signup: true })
                    }).catch(console.error);
                }).catch(console.error);
            }
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    }
}

