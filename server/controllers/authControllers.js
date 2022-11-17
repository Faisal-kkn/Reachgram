import express from 'express';
const router = express.Router();
import userRegisterSchema from '../modules/user/register.js';
import userPostSchema from '../modules/user/post.js'
import userCommentSchema from '../modules/user/comments.js'
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export default {
    jwtCheck: (req, res) => {
        res.status(200).json({ auth: true, message: "You are authenticated Congrats!" })
    },
    userRegister: async (req, res) => {
        try {
            let userName = await userRegisterSchema.findOne({ username: req.body.username.toLowerCase() })
            if (userName) {
                console.log('userName');
                console.log(userName);
                res.status(200).json({ signup: false, msg: 'This user name is already taken', username: false })
            } else {
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
                                    fullname: req.body.fullname,
                                    username: req.body.username,
                                    phone: req.body.phone,
                                    email: req.body.email,
                                    password: req.body.password,
                                    otp: req.body.otp
                                }
                            }).then(() => {
                                res.status(200).json({ signup: true, email: req.body.email })
                            }).catch(console.error);
                        }).catch(console.error);
                    } else {
                        res.status(200).json({ signup: false, msg: 'Mail id is already registered' })
                    }
                } else {
                    main().then(async (status) => {
                        otp = otp.toString()
                        req.body.otp = await bcrypt.hash(otp, 10)
                        req.body.password = await bcrypt.hash(req.body.password, 10)
                        req.body.phone = parseInt(req.body.phone)
                        let registerUser = new userRegisterSchema(req.body)
                        registerUser.save().then(() => {
                            res.status(200).json({ signup: true, email: registerUser.email })
                        }).catch(console.error);
                    }).catch(console.error);
                }
            }


        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    userOtpVerification: async (req, res) => {
        try {
            userRegisterSchema.findOne({ email: req.body.email }).then((response) => {
                bcrypt.compare(req.body.otpNum, response.otp).then((otpResponse) => {
                    otpResponse ?
                        userRegisterSchema.findOneAndUpdate({ email: req.body.email }, {
                            $set: {
                                otpStatus: true
                            }
                        }).then(() => {
                            res.status(200).json({ otpVerify: true })
                        }) : res.status(200).json({ otpVerify: false, message: 'otp is incorrect' })
                }).catch(error => res.status(400).json({ otpVerify: false, message: 'otp is incorrect' }))
            }).catch(console.error)
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    userLogin: async (req, res) => {
        try {
            userRegisterSchema.findOne({ email: req.body.email, otpStatus: true }).then((response) => {
                if (response) {
                    bcrypt.compare(req.body.password, response.password)
                        .then((loginResponse) => {
                            if (loginResponse) {
                                const user = response._id + ' ' + response.fullname
                                let token = jwt.sign({ user }, "jwtSecret", { expiresIn: 30000 });
                                res.status(200).json({ status: true, auth: true, token })
                            } else res.status(200).json({ status: false, message: 'Password is incorrect' })
                        })
                } else res.status(200).json({ status: false, message: 'Mail id is not found' })
            }).catch(console.error)
        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    newPost: (req, res) => {
        try {
            req.body.image = req.file.filename
            userPostSchema.findOne({ userId: req.body.userId }).then((response) => {
                console.log(response);
                if (response) {
                    console.log('response');
                    console.log(response);
                    if (req.body.description || req.body.image) {
                        userPostSchema.findOneAndUpdate({ userId: req.body.userId }, {
                            $push: {
                                postData: {
                                    description: req.body.discription,
                                    image: req.body.image,
                                }
                            }
                        }).then((rep) => res.status(200).json(true))
                    } else {
                        res.status(200).json(false);
                    }
                } else {
                    let userPost = new userPostSchema({
                        userId: req.body.userId,
                        postData: {
                            description: req.body.discription,
                            image: req.body.image,
                        }
                    })
                    userPost.save()
                    res.status(200).json(true)
                }
            }).catch(console.error)


        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },
    homePosts: async (req, res) => {
        try {
            userPostSchema.aggregate([
                { $lookup: { from: 'users', localField: 'userId', foreignField: "_id", as: 'user' } },
                {
                    $unwind: "$postData"
                },
                { $match: { "postData.deleteStatus": false } },
                {
                    $project: {
                        postData: 1,
                        "user": "$user.fullname",
                        "userId": "$user._id",
                    }
                },

                { $sort: { "postData.created": -1 } }
            ]).then((response) => {
                response.map((item) => {
                    item.postData.user = item.user
                    item.postData.mainId = item._id
                    item.postData.userId = item.userId
                })
                let allPostData = []
                response.map((item) => {
                    allPostData.push(item.postData)
                })
                res.status(200).json(allPostData)
            }).catch(console.error)
        } catch (error) {

        }
    },
    searchUser: (req, res)=>{
        try {
            console.log(req.query.data);
            userRegisterSchema.find({ fullname: { $regex: new RegExp(req.query.data, 'i') }, otpStatus: true }).then((response) => {
                res.status(200).json(response)
            }).catch(console.error)
        } catch (error) {
            res.status(400).json(false)
        }
    },
    likeOrDisLike: async (req, res) => {
        try {
            console.log('req.body');
            console.log(req.body);
            userPostSchema.findOne({ "_id": req.body.userId, "postData._id": req.body.postId }).then((response) => {
                console.log('response.postData');
                console.log(response);
                if (response) {
                    response.postData.findIndex((iteam) => {
                        if (iteam._id.toString() === req.body.postId) {
                            if (!iteam.Likes.includes(req.body.likedUser)) {
                                userPostSchema.findOneAndUpdate(
                                    {
                                        "_id": req.body.userId, "postData._id": req.body.postId
                                    },
                                    {
                                        $push: {
                                            "postData.$.Likes": req.body.likedUser
                                        }
                                    }).then((response) => {
                                        res.status(200).json(response)
                                    }).catch(console.error)
                            } else {
                                userPostSchema.findOneAndUpdate(
                                    {
                                        "_id": req.body.userId, "postData._id": req.body.postId
                                    },
                                    {
                                        $pull: {
                                            "postData.$.Likes": req.body.likedUser
                                        }
                                    }
                                ).then((response) => {
                                    res.status(200).json(response)
                                }).catch(console.error)
                            }
                        }
                    })
                }

            })
        } catch (error) {

        }
    },
    myProfile: (req, res) => {
        try {
            console.log(req.query);
            userPostSchema.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(req.query.userId) } },
                {
                    $unwind: "$postData"
                },
                { $match: { "postData.deleteStatus": false } },

            ]).then((response) => {
                response.map((item) => {
                    item.postData.user = item.user
                    item.postData.mainId = item._id
                    item.postData.userId = item.userId
                })
                let allPostData = []
                response.map((item) => {
                    allPostData.push(item.postData)
                })

                if (response) res.status(200).json(allPostData)
                else res.status(400).json(false)
            }).catch(console.error)
        } catch (error) {

        }
    },
    myProfileData: async (req, res) => {
        try {
            userRegisterSchema.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(req.query.userId) } },
                {
                    $project: {
                        _id: 0, fullname: 1, username: 1, phone: 1,
                        email: 1, about: 1, profile: 1,
                    }
                },
            ]).then((response) => {
                if (response) res.status(200).json(response)
                else res.status(400).json(false)
            }).catch(console.error)
        } catch (error) {

        }
    },
    updatePost: (req, res) => {
        try {
            console.log('userId data');
            console.log(req.body);
            userPostSchema.findOneAndUpdate({ _id: req.body.mainId, userId: req.body.userId, "postData._id": req.body.postId }, {
                $set: {
                    "postData.$.description": req.body.description,
                }
            }).then((response) => {
                if (response) res.status(200).json(true)
                else res.status(400).json(false)
            }).catch(console.error)
        } catch (error) {

        }
    },
    deletePost: (req, res) => {
        try {
            console.log('userId data');
            console.log(req.query);
            userPostSchema.findOneAndUpdate(
                {
                    _id: req.query.mainId, "postData._id": req.query.postId
                },
                {
                    $set: {
                        "postData.$.deleteStatus": true,
                    }
                }
            )
                .then((response) => {
                    if (response) res.status(200).json(true)
                    else res.status(400).json(false)
                }).catch(console.error)
        } catch (error) {

        }
    },
    updateProfile: (req, res) => {
        try {
            console.log('ethiiiii');
            const { phone, email, about, fullname, username, userId } = req.body
            console.log(req.body);
            if (phone && email && fullname && username && userId) {
                const regex = /^@?(\w){1,15}$/;
                const found = username.match(regex);
                console.log(found);
                if (found != null) {
                    userRegisterSchema.findOne({ _id: userId, otpStatus: true }).then(async (response) => {
                        console.log('user not asasa');

                        if (response) {
                            let userNameValid = await userRegisterSchema.findOne({ username: username.toLowerCase(), otpStatus: true })

                            if (userNameValid && response.username != username) {
                                console.log('User name is exist');
                                res.json({ status: false, username: false, email: true, msg: 'User name is exist' })
                            } else {
                                let emailValid = await userRegisterSchema.findOne({ email: email, otpStatus: true })

                                if (emailValid && response.email != email) {
                                    console.log('Email id is exist');
                                    res.json({ status: false, username: true, email: false, msg: 'Email id is exist' })
                                } else{
                                    console.log('evdeeee');
                                    userRegisterSchema.findOneAndUpdate({ _id: userId }, {
                                        $set: {
                                            phone,
                                            email,
                                            fullname,
                                            username,
                                            about: req.body.about,
                                            profile: req.file?.filename,
                                        }
                                    }).then((response) => {
                                        res.status(200).json(true)
                                    })
                                }
                            }



                        }
                        else {
                            console.log('user not found');
                            res.status(400).json({ status: false, msg: 'user not found' })
                        }
                    }).catch(console.error)
                } else {
                    res.json({ status: false, msg: 'please check this field' })
                }
            } else {
                console.log('looooooo');
                res.json({ status: false, msg: 'please fill the required fields' })
            }

        } catch (error) {

        }
    },
    postComments: (req, res) => {
        try {
            console.log('lll');
            console.log(req.query);
            // userPostSchema.aggregate([
            //     { $match: { userId: mongoose.Types.ObjectId(req.query.userId) } },
            //     {
            //         $unwind: "$postData"
            //     },
            //     { $match: { "postData.deleteStatus": false } },

            // ]).then((response) => {
            //     response.map((item) => {
            //         item.postData.user = item.user
            //         item.postData.mainId = item._id
            //         item.postData.userId = item.userId
            //     })
            //     let allPostData = []
            //     response.map((item) => {
            //         allPostData.push(item.postData)
            //     })

            //     if (response) res.status(200).json(allPostData)
            //     else res.status(400).json(false)
            // }).catch(console.error)
        } catch (error) {

        }
    },
    commentPost: (req, res)=>{
        try {
            console.log(req.body);
            userCommentSchema.findOne({ postId: req.body.postId }).then((response) => {
                console.log(response);
                if (response) {
                    if (req.body.userId && req.body.postId && req.body.comment) {
                        userCommentSchema.findOneAndUpdate({ postId: req.body.postId }, {
                            $push: {
                                comments: {
                                    userId: req.body.userId,
                                    comment: req.body.comment,
                                }
                            }
                        }).then((rep) => res.status(200).json(true))
                    } else {
                        res.status(200).json(false);
                    }
                } else {
                    let userComment = new userCommentSchema({
                        postId: req.body.postId,
                        comments: {
                            userId: req.body.userId,
                            comment: req.body.comment,
                        }
                    })
                    userComment.save()
                    res.status(200).json(true)
                }
            }).catch(console.error)


        } catch (error) {
            res.status(501).json({ message: error.message });
        }
    },

}

