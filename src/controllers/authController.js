const UserModel = require('../models/user');
const {success, failure, validate} = require('../helpers/responseApi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const { response } = require('../app');
const {generateToken} = require('../helpers/generateToken');

/**
 * @api {post} api/v1/users Create User Account
 * */    

exports.createUserAccount = async (req, res) => {
    //Checking validation of the request body
    const checkValidation = validationResult(req);
    if (!checkValidation.isEmpty()){
        return res.status(422).json(validate(checkValidation.array()))
    }
    
    const {email, password, phone_number, first_name, last_name} = req.body;
    try {
        let userEmailExist = await UserModel.findOne({email})
        if(userEmailExist)
        return res
           .status(422)
           .json(validate({message: "Email already exists"}))

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        let newUser = await UserModel.create({
            email:  email.toLowerCase(),
            first_name,
            last_name,
            phone_number,
            password : hashPassword
        })
        await newUser.save();
        newUser.token = generateToken(newUser.id);
       // newUser.token = token;

        return res.cookie({'token': token}).json(success('User registered successfully',newUser)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json(failure('Could not register user', res.statusCode));
    }
}


exports.Login = async (req, res) => {   
    //Checking validation of the request body
    const Checkvalidation = validationResult(req);
    if (!Checkvalidation.isEmpty()){
        return res.status(422).json(validate(Checkvalidation.array()))
    }

    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({ email});
        if(!user) 
        return res.status(422).json(failure("Invalid credentials", res.statusCode));

        let checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword)
        return res.status(422).json(failure("Invalid credentials", res.statusCode));

        const token = await jwt.sign({email: user.email, id: user.id}, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        }
        );

        return res.cookie({"token": token}).json(success("You're welcome back!", {token},  res.statusCode));

    } catch (err) {
       // console.error(err.message);
        res.status(500).json(failure(err.message, res.statusCode));
    }
}
