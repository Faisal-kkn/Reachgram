import mongoose from 'mongoose';
import Joi from 'joi';
// var userRegisterSchema = new mongoose.Schema({
//     fullname: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: false
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     status: {
//        type: Boolean,
//        default: false
//     },
//     report_status: {
//         type: Boolean,
//         default: false
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     },
// });

// let userRegisterr = mongoose.model('Users', userRegisterSchema);

// const validate = function (data) {
//     let schema = {
//         fullname: Joi.types.String().required(),
//         username: Joi.types.String().required(),
//         phone: Joi.types.String().length(10).pattern(/^[0-9]+$/).required(),
//         email: Joi.types.String().min(3).required().email(),
//         password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         status: Joi.types.Boolean().required(),
//         report_status: Joi.types.Boolean().required(),
//         created: Joi.boolean().invalid(false),
//     }
//     return schema.validate(data);
// }
// export default { userRegisterr, validate }

// const mongoose = require('mongoose');
// let otpSchema = new mongoose.Schema({
//     otpNum : {
//         type: String,
//         require: true,
//     }
// })

let userRegisterSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: false
    },
    otpStatus: {
        type: Boolean,
        default: false
    },
    about: {
        type: String,
        required: false
    },
    profile: {
        type: String,
        required: false
    },
    status: {
       type: Boolean,
       default: false
    },
    report_status: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
});

// {// let userRegisterr = mongoose.model('users', userRegisterSchema)

// const validate = function (data) {
//     console.log(data);
//     let schema = {
//         fullname: Joi.types.String().required(),
//         username: Joi.types.String().required(),
//         phone: Joi.types.String().length(10).pattern(/^[0-9]+$/).required(),
//         email: Joi.types.String().min(3).required().email(),
//         password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         status: Joi.types.Boolean().required(),
//         report_status: Joi.types.Boolean().required(),
//         created: Joi.boolean().invalid(false),
//     }
//     return schema.validate(data);
// }
// export default { userRegisterr, validate }}

export default mongoose.model('users', userRegisterSchema)
