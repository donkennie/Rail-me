const UserModel = require('../models/user');
const {success, failure, validate} = require('../helpers/responseApi');
const bcrypt = require('bcryptjs');
const { response } = require('../app');
const {generateToken} = require('../helpers/generateToken');
const {RequestValidator} = require('../middleware/requestValidation');

/**
 * @api {post} api/v1/users Create User Account
 * */    

exports.createUserAccount = async (req, res) => {
    RequestValidator(req, res);
    
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

        return res.json(success('User registered successfully', ` You're welcome, ${newUser.first_name}!`)
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json(failure('Could not register user', res.statusCode));
    }
}


exports.Login = async (req, res) => {   
    //Checking validation of the request body
    RequestValidator(req, res);

    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({ email});
        if(!user) 
        return res.status(422).json(failure("Invalid credentials", res.statusCode));

        let checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword)
        return res.status(422).json(failure("Invalid credentials", res.statusCode));

        const token = generateToken( user.email, user.id);

        return res.cookie({"token": token}).json(success("You're welcome back!", {token},  res.statusCode));

    } catch (err) {
        console.error(err.message);
        res.status(500).json(failure(err.message, res.statusCode));
    }
}

//Get all users(admin only)
exports.GetAllUsers = async (req, res) => {1    
    const users = await UserModel.find();
    if(!users) return res.status(422).json(failure("No use", res.statusCode));
    
    return res.json(success("Retrived successfully", users));  
}