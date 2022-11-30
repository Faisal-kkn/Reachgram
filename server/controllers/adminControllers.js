import express from 'express';
const router = express.Router();
import userRegisterSchema from '../modules/user/register.js';
import userPostSchema from '../modules/user/post.js';
import adminLoginSchema from '../modules/admin/adminLogin.js'
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export default {
    jwtCheck: (req, res) => {
        res.status(200).json({ auth: true, message: "You are authenticated Congrats!" })
    },
    adminLogin: (req, res)=>{
        try {
            adminLoginSchema.findOne({email: req.body.email}).then((response) => {
                if (response) {
                    bcrypt.compare(req.body.password, response.password)
                        .then((loginResponse) => {
                            if (loginResponse) {
                                const admin = response._id
                                let token = jwt.sign({ admin }, process.env.ADMIN_JWT_SECRET, { expiresIn: 30000 });
                                res.status(200).json({ status: true, auth: true, token })
                            } else res.json({ status: false, message: 'Password is incorrect' })
                        })
                } else res.json({ status: false, message: 'Mail id is not found' })
            }).catch(console.error)
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    allUsers: (req, res) => {
        try {
            userRegisterSchema.aggregate([
                {
                    $match: { otpStatus: true }
                },
                {
                    $project: {
                        profile: 1, fullname: 1, username: 1,
                        email: 1, status: 1, _id:1
                    }
                }
            ]).then((response) => {
                    if (response) {
                        res.status(200).json(response)
                    }
                    else res.status(400).json(false)
                })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    blockUser: (req, res)=>{
        try {
            userRegisterSchema.findOneAndUpdate({ _id: req.body.userId }, {
                $set: {
                    status: true,
                }
            }).then((response) => {
                res.status(200).json(true)
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    unBlockUser: (req, res) => {
        try {
            userRegisterSchema.findOneAndUpdate({ _id: req.body.userId }, {
                $set: {
                    status: false,
                }
            }).then((response) => {
                res.status(200).json(true)
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    allPosts: (req, res) => {
        try {
            userPostSchema.aggregate([
                { $lookup: { from: 'users', localField: 'userId', foreignField: "_id", as: 'user' } },
                {
                    $unwind: "$postData"
                },
                { $match: { "postData.deleteStatus": false } },
                {
                    $project: {
                        postImage: "$postData.image",
                        postId: "$postData._id",
                        postStatus: "$postData.report_status",
                        postReport: { $size: "$postData.reported_by" },
                        "user": "$user.fullname",
                        "username": "$user.username",
                        "profile": "$user.profile",
                        "userId": "$user._id",
                    }
                },
                { $sort: {postReport: -1}}
            ]).then((response) => {
                console.log(response);
                if (response) {
                    res.status(200).json(response)
                }
                else res.status(400).json(false)
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    blockPost: (req, res) => {
        console.log(req.body);
        try {
            userPostSchema.findOneAndUpdate({ userId: req.body.userId, "postData._id": req.body.postId  }, {
                $set: {
                    "postData.$.report_status": true,
                }
            }).then((response) => {
                res.status(200).json(true)
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    unBlockPost: (req, res) => {
        try {
            userPostSchema.findOneAndUpdate({ userId: req.body.userId, "postData._id": req.body.postId }, {
                $set: {
                    "postData.$.report_status": false,
                }
            }).then((response) => {
                res.status(200).json(true)
            })
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },

}
