const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default:"/images/house.jpg"
    },
    occupants: [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    code: {
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.model('House',HouseSchema)