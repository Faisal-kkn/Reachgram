import express from 'express';
const router = express.Router();
import userRegisterSchema from '../modules/user/register.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose'

export default {
    registerUser: ({ data, otpStatus }) => {
        try {
            console.log(data.email);
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
                    to: data.email, // list of receivers
                    subject: "OTP Varification", // Subject line
                    text: "OTP", // plain text body
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                });

                console.log("Message sent: %s", info.messageId);

                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }

            
        } catch (error) {
            console.error
        }
    }
}