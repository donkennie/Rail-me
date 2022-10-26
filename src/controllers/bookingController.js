const {success, failure, validate} = require('../helpers/responseApi');
const bookingService = require('../services/bookingService');
const {RequestValidator} = require('../middleware/requestValidation');

exports.CreateBooking = async (req, res) => {
    RequestValidator(req, res);
    try{
        const booking = await bookingService.CreateBooking(req.body);
        return res.status(201).json(booking);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(failure('Failed to create booking', res.statusCode));
    }
}

exports.DeleteBooking = async (req, res) => {
    RequestValidator(req, res);
    try {
        const booking = await bookingService.DeleteBooking(req.params.id)
        return res.status(201).json(success("Deleted successfully!", true))
    } catch (error) {
        console.error(err.message);
        res.status(500).json(failure('Failed to delete booking', res.statusCode));
    }
}

exports.GetBooking = async (req, res) => {
    RequestValidator(req, res);
    try {
        const booking = await bookingService.GetBookingById(req.params.id)
    if(!booking) return res.status(400).json(failure('Could not fetch the Id', res.statusCode));
        return res.status(200).json(success("Retrieved booking", booking))
    } catch (error) {
        console.error(err.message);
        res.status(500).json(failure('Failed to fetch booking from the server', res.statusCode));
    }
}

exports.UpdateBooking = async (req, res) => {
    RequestValidator(req, res);
    try {
        const booking = await bookingService.UpdateBooking(req.params.id, req.body);
        return res.status(200).json(success("Updated successfully!", booking))
    } catch (error) {
        console.error(err.message);
        res.status(500).json(failure('Failed to update booking from the server', res.statusCode));
    }
}

exports.GetAllBooking = async (req, res) => {
    try {
        const booking = await bookingService.GetAllBooking();
        return res.status(200).json(success("Done successfully!", booking))
        
    } catch (error) {
        console.error(err.message);
        res.status(500).json(failure('Failed to get booking from the server', res.statusCode));
    }
}