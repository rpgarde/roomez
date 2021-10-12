const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
    users: [{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
});

module.exports = mongoose.model('House',HouseSchema)