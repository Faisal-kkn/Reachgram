import mongoose from 'mongoose';
const { Schema } = mongoose;


let userFriendsSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    following: Array,
    followers: Array,
}, { timestamps: true })


export default mongoose.model('friends', userFriendsSchema)
