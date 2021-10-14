const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChoreSchema = new Schema({
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
    complete:{
        type:Boolean,
        required:true
    },
    completedAt:{
        type: Date
    },
    photo:{
        type:String
    }
});

module.exports = mongoose.model('Chore',ChoreSchema)