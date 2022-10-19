const {validationResult} = require("express-validator");
const {validate} = require('../helpers/responseApi');

exports.RequestValidator= async (req, res) => { 
    const checkError = validationResult(req);
    if (!checkValidation.isEmpty()){
        return res.status(422).json(validate(checkError.array()))
    }
 };