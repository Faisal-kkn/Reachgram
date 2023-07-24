import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
const __dirname = path.resolve();
dotenv.config();

import http from 'http';
import {Server} from 'socket.io'

const app = express();

const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    path: "/api/socket.io",
    cors: {
        origin: ['https://reachgram.online']
    }
})



import user from './routes/user.js'
import chat from './routes/chat.js'
import admin from './routes/admin.js'



app.use(bodyParser.json({ "limit": "30mb", extended: true }));
app.use(bodyParser.urlencoded({ "limit": "30mb", extended: true }));
app.use(express.json())
app.use(cors())

app.use('/api/images', express.static(path.join(__dirname, 'public/images')))


const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;


let users = []

const addUser = (userId, socketId)=>{
    !users.some((user) => user.userId === userId ) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find(user => user.userId === userId);
}


let onlineUsers = []

const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId })
}

const removeOnlineUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}


const getOneUser = (username) => {
    return onlineUsers.find(user => user.username === username);
}

io.on("connection", (socket) => {
    socket.on('addUser', userId=>{
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('newUser', (username)=>{
        addNewUser(username, socket.id)
    })

    socket.on('sendNotification', ({ senderName, receiverName, type })=>{
        const reciver = getOneUser(receiverName)
        io.to(reciver?.socketId).emit("getNotification", {
            senderName, 
            type
        })
    })
    
    socket.on('send-message', ({senderId, reciverId, text})=>{
        const user = getUser(reciverId)
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });
    
    socket.on("disconnect", () => {
        removeUser(socket.id)
        removeOnlineUser(socket.id)
        io.emit('getUsers', users)
    })

});


mongoose.connect(CONNECTION_URL, () => {
    httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    console.log('Database is connected');
}, e => console.error(e))

app.use('/api/', user)
app.use('/api/chat', chat)
app.use('/api/admin', admin)

