import mongoose from 'mongoose';

let adminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export default mongoose.model('admin', adminLoginSchema)
