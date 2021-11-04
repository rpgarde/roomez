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
        ref:"User"
    },
    assignedTo:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    complete:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type: Date
    },
    photo:{
        type:String
    },
    isArchived:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Chore',ChoreSchema)