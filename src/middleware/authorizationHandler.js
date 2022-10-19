const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const {ApplicationError} = require('../middleware/applicationError');

exports.IsAuthenticatedUser = async(req, res, next) => {
   const {token} = req.cookies;
   if (!token) {
      return next(new ApplicationError("Not authenticated", 401));
   }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await UserModel.findById(decodedData.id);

    next();
};


exports.IsAdminUser = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.roles)) {
            return next(
                new ApplicationError(`Role: ${req.user.role} is not allowed to access this resouce `,403)
            );  
        }
        
        next();
    };
}
