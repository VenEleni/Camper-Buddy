import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../actions/cartActions';

const CheckoutForm = ({ stripe, elements, setLoading, setError, setSuccess }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <button type="submit" disabled={!stripe || setLoading}>
        {setLoading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;