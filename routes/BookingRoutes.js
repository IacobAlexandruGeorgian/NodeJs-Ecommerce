const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-sessions/:tourID', bookingController.getCheckoutSession);

module.exports = router;

router.use(authController.restrictTo('admin', 'lead-guide'))

router
    .route('/')
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking)

router
    .route('/:id')
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking)
    .delete(bookingController.deleteBooking)