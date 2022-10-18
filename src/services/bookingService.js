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
      const booking = await BookingModel.findByIdAndDelete(id);
        return booking;
    } catch (error) {
        
    }
};

const UpdateBooking = async (id, changes) =>{
    try {
        const booking = await Booking.findByIdAndUpdate(id, changes,{
            new: true,
            runValidations: true
        });
        return booking;
    } catch (error) {
        throw{
            status: error.status || 500,
            message: error?.message || error
        }
    }
};

const GetAllBooking = async () =>{
    try {
      const bookings = await BookingModel.find()
      return bookings;
    } catch (error) {
        
        throw{
            status: error.status || 500,
            message: error?.message || error
        }
    }
}

const GetBookingById = async (id) =>{
   try {
      const booking = await BookingModel.findById(id);
        return booking;
   } catch (error) {
    throw{
        status: error.status || 500,
        message: error?.message || error
    }
   }
};

module.exports = {
    CreateBooking,
    DeleteBooking,
    UpdateBooking,
    GetAllBooking,
    GetBookingById
}
