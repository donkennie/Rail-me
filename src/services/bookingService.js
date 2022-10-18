const BookingModel= require('../models/booking')
const {ApplicationError} = require('../helpers/applicationError');

const CreateBooking = async (body) =>{
    try {     
        if(!body) return new ApplicationError('Invalid request!');

        const booking = await BookingModel.create({
            name: body.name,
            location: body.location,
            address: body.address,
            time: body.time,
            price: body.price,
            seatCode: body.seatCode,
            flightDate: body.flightDate,
        });

        return booking;


    } catch (error) {
        
        throw{
            status: error.status || 500,
            message: error?.message || error
        }
    }
};

const DeleteBooking = async (id) =>{
    try {
        return;
    } catch (error) {
        
    }
};

const UpdateBooking = async (id) =>{
    try {
        
    } catch (error) {
        
    }
};

const GetAllBooking = async () =>{
    try {
        return;
    } catch (error) {
        
    }
}

const GetBookingById = async (id) =>{
   try {
     return;
   } catch (error) {
    
   }
};

module.exports = {
    CreateBooking,
    DeleteBooking,
    UpdateBooking,
    GetAllBooking,
    GetBookingById
}
