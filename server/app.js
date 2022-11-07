import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import user from './routes/user.js'

const app = express();


app.use(bodyParser.json({ "limit": "30mb", extended: true }));
app.use(bodyParser.urlencoded({ "limit": "30mb", extended: true }));
app.use(express.json())
app.use(cors())

const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;
await mongoose.connect(CONNECTION_URL, () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    console.log('Database is connected');
}, e => console.error(e))

app.use('/', user)



// await mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=> 
// .catch((error)=> console.log(error.message));


// mongoose.set("useFindAndModify", false);