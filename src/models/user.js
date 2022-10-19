const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required:[ true, "Please Enter Your Name"],
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
        required:[true, "Please Enter Your Email"],
        unique: true,
        minLength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minLength:[5, "Password should be greater than 5 characters"],
        maxlength: 255,
        select: false
    },
    phone_number: { 
        type: String,
        required: true,
        maxlength: 20
    },

    role: {
        type: String,
        default: "user",
      },

    token: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },

});

// userSchema.pre('save', async function(next) {
//     if(!this.isModified("password")) {
//        next();
//     }
//    const salt = await bcrypt.genSalt(this.password, salt);

module.exports = mongoose.model("User", userSchema);