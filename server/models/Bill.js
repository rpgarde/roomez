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
        ref:"User"
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
        default:false
    },
    paidAt:{
        type: Date
    },
    photo:{
        type: String
    },
    isArchived:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Bill',BillSchema)