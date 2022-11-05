import mongoose from 'mongoose';
import Joi from 'joi';

var userRegisterSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
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

userRegisterSchema.methods.joiValidate = function (obj) {
    let schema = {
        fname: Joi.types.String().required(),
        lname: Joi.types.String().required(),
        phone: Joi.types.String().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.types.String().min(3).required().email(),
        password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
        status: Joi.types.Boolean().required(),
        report_status: Joi.types.Boolean().required(),
        created: Joi.boolean().invalid(false),
    }
    return Joi.validate(obj, schema);
}
export default mongoose.model('Users', userRegisterSchema);