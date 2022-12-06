import express from 'express';
const router = express.Router();
import userChatListSchema from '../modules/user/chatList.js'
import userRegisterSchema from '../modules/user/register.js';
import userConversationSchema from '../modules/user/conversation.js';

import userPostSchema from '../modules/user/post.js';
import userCommentSchema from '../modules/user/comments.js';
import userFriendsSchema from '../modules/user/friends.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export default {
    chatList: (req, res) => {
        // console.log(req.query.userId);
        try {
            userChatListSchema.find({ members: { $in: [req.query.userId] } }).then((response) => {
                console.log('userChatListSchema');
                console.log(response);
                res.status(200).json(response)
                // let users= []
                // response.map((iteam)=>{
                //     users.push(iteam.members[1])
                // })
                // userRegisterSchema.find({ _id: users}).then((response) => {
                //     if (response) res.status(200).json(response)
                //     else res.json(false)
                // })
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    chatUsers: (req, res) => {
        try {
            console.log('req.query');
            console.log(req.query);
             
            userRegisterSchema.find({ _id: req.query.friendId}).then((response) => {
                    if (response) res.status(200).json(response)
                    else res.json(false)
                })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    newChat:  (req, res) => {
        console.log(req.body);
        try {
            // userChatListSchema.findOne({ userId: req.body.myId }).then((response) => {
            //     if (response) {
            //         var found = response.senders.find(e => e.id == req.body.userId)
            //         if (!found) {
            //             userChatListSchema.findOneAndUpdate({ userId: req.body.myId }, {
            //                 $push: {
            //                     senders: {
            //                         id: req.body.userId
            //                     }
            //                 }
            //             }).then((response)=>{
            //                 console.log(response);
            //                 res.status(200).json(true)
            //             })
            //         } else res.status(200).json(true)
            //     } else {
            //         let newUserChat = new userChatListSchema({
            //             userId: req.body.myId,
            //             senders: {
            //                 id: req.body.userId
            //             }
            //         })
            //         newUserChat.save().then(() => {
            //             res.status(200).json(true)
            //         })
            //     }
            // })
            userChatListSchema.findOne({ members: { $all: [req.body.myId, req.body.userId] } }).then(async (response) => {
                if (response == null) {
                    const newChat = new userChatListSchema({
                        members: [req.body.myId, req.body.userId]
                    })

                    const savedChat = await newChat.save()
                    res.status(200).json(savedChat)
                }else{
                    res.status(200).json(true)
                }
            })



        } catch (error) {
            res.status(500).json(error)
        }
    },
    conversation: async (req, res) => {
        try {
            
            const newMessage = new userConversationSchema(req.body)
            const savedMsg = await newMessage.save()
            console.log('savedMsg');
            console.log(savedMsg);
            res.status(200).json(savedMsg)

        } catch (error) {
            res.status(500).json(error)
        }
    },
    getConversation: (req, res)=>{
        try{
            userConversationSchema.find({ conversationId: req.query.conversationId }).then((response)=>{
                res.status(200).json(response)
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
