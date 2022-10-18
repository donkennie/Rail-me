const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 255
    },
    last_name: {
        type: String,
        required: true,
        minLength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 255
    },
    phone_number: { 
        type: String,
        required: true,
        maxlength: 20
    },
    token: {
        type: String,
    }

});

// userSchema.pre('save', async function(next) {
//     if(!this.isModified("password")) {
//        next();
//     }
//    const salt = await bcrypt.genSalt(this.password, salt);

module.exports = mongoose.model("User", userSchema);