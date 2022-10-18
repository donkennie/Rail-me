const {validationResult} = require("express-validator");
const {success, failure, validate} = require('../helpers/responseApi');
const bookingService = require('../services/bookingService');

exports.CreateBooking = async (req, res) => {
    const checkValidation = validationResult(req);
    if (!checkValidation.isEmpty()){
        return res.status(422).json(validate(checkValidation.array()))
    }

    try{
        const booking = await bookingService.CreateBooking(req.body);
        return res.status(201).json(success("Created successfully!", booking))
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(failure('Failed to create booking', res.statusCode));
    }
}