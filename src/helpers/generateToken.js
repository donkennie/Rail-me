const jwt = require('jsonwebtoken');

exports.generateToken = () => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    }); 
};

//export default generateToken;