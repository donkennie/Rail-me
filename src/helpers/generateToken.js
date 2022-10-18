const jwt = require('jsonwebtoken');

exports.generateToken = (email, id) => {
    return jwt.sign({email:email, id: id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    }); 
};

