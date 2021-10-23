const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    house: {
        type: Schema.Types.ObjectId,
        ref:"House"
    },
    photo:{
        type:String
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    console.log('password saved')
    next();
  });
  
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  

module.exports = mongoose.model('User',UserSchema)

