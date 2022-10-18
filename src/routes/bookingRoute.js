const express = require('express'); 

const router = express.Router();

const booking = require('../controllers/bookingController');

router.route('/createBooking')
      .post(booking.CreateBooking);


module.exports = router;