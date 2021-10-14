const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    createdAt:{
        type: Date,
        default: () => new Date()
    },
    name:{
        type:String,
        required:true
    },
    dueAt:{
        type: Date
    },
    house:{
        type:Schema.Types.ObjectId,
        ref:"House"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true
    },
    paid:{
        type:Boolean,
        required:true
    },
    paidAt:{
        type: Date
    },
    photo:{
        type: String
    }
});

module.exports = mongoose.model('Bill',BillSchema)