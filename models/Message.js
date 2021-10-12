const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    createdAt:{
        type: Date,
        default: () => new Date()
    },
    message:{
        type:String,
        required:true
    },
    houseId:{
        type:Schema.Types.ObjectId,
        ref:"House"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    photo:{
        type:String
    }
});

module.exports = mongoose.model('Message',MessageSchema)