import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import http from 'http';
import {Server} from 'socket.io'

const app = express();

const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    cors: {
        origin: ['http://localhost:3000']
    }
})



import user from './routes/user.js'
import chat from './routes/chat.js'
import admin from './routes/admin.js'



app.use(bodyParser.json({ "limit": "30mb", extended: true }));
app.use(bodyParser.urlencoded({ "limit": "30mb", extended: true }));
app.use(express.json())
app.use(cors())

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

io.on("connection", (socket) => {
    socket.on('addUser', userId=>{
        addUser(userId, socket.id)
        socket.emit('getUsers', users)
    })

    socket.on('send-message', ({senderId, reciverId, text})=>{
        const user = getUser(reciverId)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
    });

    socket.on('disconnect', ()=>{
        removeUser(socket.id)
        socket.emit('getUsers', users)
    })

});

await mongoose.connect(CONNECTION_URL, () => {
    httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    console.log('Database is connected');
}, e => console.error(e))

app.use('/', user)
app.use('/chat', chat)
app.use('/admin', admin)



// await mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=> 
// .catch((error)=> console.log(error.message));


// mongoose.set("useFindAndModify", false);