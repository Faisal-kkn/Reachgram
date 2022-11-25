import mongoose from 'mongoose';
const { Schema } = mongoose;


// let conversationSchema = new mongoose.Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         required: true,
//     },
//     senderId: {
//         type: Schema.Types.ObjectId,
//         required: true,
//     },
//     messages: [
//         {
//             id: {
//                 type: Schema.Types.ObjectId,
//                 required: true,
//             },
//             time: {
//                 type: Date,
//                 default: Date.now
//             },
//             content: {
//                 type: String,
//                 required: true,
//             },
//         }
//     ],

// })


let conversationSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String
        },
    },
    { timestamps: true }
)

export default mongoose.model('conversation', conversationSchema)
