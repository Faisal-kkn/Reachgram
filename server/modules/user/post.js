import mongoose from 'mongoose';
const { Schema } = mongoose;


let likeSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    time: {
        type: Date,
        default: Date.now
    }
})


let postDataSchema = new mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    reported_by: {
        type: Array,
    },
    report_status: {
        type: Boolean,
        default: false
    },
    deleteStatus: {
        type: Boolean,
        default: false
    },
    Likes: Array,
    created: {
        type: Date,
        default: Date.now
    },
})

let userPostSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    postData: [postDataSchema],

})

export default mongoose.model('posts', userPostSchema)
