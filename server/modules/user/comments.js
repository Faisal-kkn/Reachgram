import mongoose from 'mongoose';
const { Schema } = mongoose;


let commentsDataSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    Likes: Array,
    created: {
        type: Date,
        default: Date.now
    },
})


let userCommentSchema = new mongoose.Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    comments: [commentsDataSchema],
})


export default mongoose.model('comments', userCommentSchema )
