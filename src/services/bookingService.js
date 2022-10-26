const BookingModel= require('../models/booking')
const {ApplicationError} = require('../middleware/applicationError');
const {success, failure, validate} = require('../helpers/responseApi');

const CreateBooking = async (body) =>{
    try {     
        if(!body) return new ApplicationError('Invalid request!', 422);

        const booking = await BookingModel.create({
          name: body.name,
          location: body.location,
          address: body.address,
          time: body.time,
          seatCode: RandomNumber(),
          flightTime: body.flightTime,
          availableServices: body.availableServices
        });

       if(body.availableServices === "reservation"){
        return success(`You are on reservation service. Your accomodation price is $500`, booking);
       }

       else if(body.availableServices === "business"){
        return success(`You are on business service. You're accomodation price is $600`, booking);
       }

       else if(body.availableServices === "economy"){
        return success(`You are on economy service. You're accomodation price is $200`, booking);
       }

        return failure(`You are not on any service`, 500);


    } catch (error) {
        
        throw{
            status: error.status || 500,
            message: error?.message || error
        }
    }
};

// const success = ( data) => {
//     return {
//         data
//     };
// };

// const expression = (availableService) => {

//       switch (availableService) {
//     case 'reservation':
//    return success (`You are on ${availableService} service. Your accomodation price is $200`, "Ogbon");
//    break;

//     case 'business':
//        console.log(`You are on ${availableService} service. You're accomodation price is $300`);
//         break;

//     case 'economy':
//        console.log(`You are on ${availableService} service. You're accomodation price is $500`);
//         break;

//     default:
//         console.log("You've not selected any available service yet");
//         break;

// } 
// }

const RandomNumber = () => {
    return Math.floor(Math.random() * (200 - 10) + 10)
}


const DeleteBooking = async (id) =>{
    try {
      const booking = await BookingModel.findByIdAndDelete(id);

      if(!booking) return new ApplicationError('No booking of the Id found in the database', 400);
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
      if(!bookings) return new ApplicationError(`No bookings found in the database`, 422);

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
