/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51Oh93eIDnVpVxadqExENBPabsWzShrWuWtaOP6kHUHEttFewzef5Whf60UfoSeoj8kx72sePuz0b3M5FWUU6WUnu005VazNjYY');

export const bookTour = async tourId => {
  try {

    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};