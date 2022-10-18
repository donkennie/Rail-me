const express = require('express'); 

const router = express.Router();

const booking = require('../controllers/bookingController');

router.route('/createBooking')
      .post(booking.CreateBooking);

router.route('/updateBooking')
      .patch(booking.UpdateBooking);

router.route('/getAllBooking')
      .get(booking.GetAllBooking);

router.route('/getBookingById/:id')
      .get(booking.GetBooking);

router.route('/deleteBooking/:id')
      .delete(booking.DeleteBooking);

module.exports = router;