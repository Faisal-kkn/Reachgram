import mongoose from 'mongoose';
const { Schema } = mongoose;


let userChatListSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        },
    },
    { timestamps: true }
);

export default mongoose.model('chatlist', userChatListSchema)


// userId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    // senders: [
    //     {
    //         id: {
    //             type: Schema.Types.ObjectId,
    //             required: true,
    //         },
    //         status: {
    //             type: Boolean,
    //             default: false,
    //         }
    //     }
    // ],