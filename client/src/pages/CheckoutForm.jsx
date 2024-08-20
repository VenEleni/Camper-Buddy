import React, { useState } from 'react';
import { PaymentElement,  useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../actions/cartActions';

const CheckoutForm = ({  setError, setSuccess }) => {
  const stripe = useStripe();
  const elements = useElements()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Stripe:', stripe);
    console.log('Elements:', elements);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again later.');
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        dispatch(clearCart());
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={loading || !stripe || !elements}>
      {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;