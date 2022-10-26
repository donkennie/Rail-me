const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    location: { 
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    seatCode: { 
        type: Number, 
        required: true, 
        default: null
    },

    createdAt: {   
        type: Date,
        default: Date.now()
    },

    flightTime: {
        type: Date,
        default: null
    },

    availableServices: {
        type: String,
        enum: ['reservation', 'business', 'economy',],
        default: 'reservation'
    }

})

module.exports = mongoose.model("Booking", bookingSchema);