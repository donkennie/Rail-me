const {validationResult} = require("express-validator");
const {validate} = require('../helpers/responseApi');

exports.RequestValidator= async (req, res) => { 

    const checkValidation = validationResult(req);
    if (!checkValidation.isEmpty()){
        return res.status(422).json(validate(checkValidation.array()))
    }
 };