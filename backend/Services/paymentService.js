const Stripe = require('stripe');
const stripe = Stripe('your_stripe_secret_key'); // Replace with your Stripe secret key

async function createPaymentIntent(amount) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit
      currency: 'inr',
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

module.exports = {
  createPaymentIntent,
};
