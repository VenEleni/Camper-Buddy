import React, { useState } from 'react';
import { PaymentElement,  useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../actions/cartActions';
import { setShippingInfo } from '../actions/shippingActions';
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({  setError, setSuccess, orderData }) => {
  const stripe = useStripe();
  const elements = useElements()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Stripe:', stripe);
    console.log('Elements:', elements);
    console.log('setSuccess:', setSuccess);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again later.');
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
          await dispatch(setShippingInfo(orderData));
          await dispatch(clearCart());
          setSuccess(true);
          navigate('/ordersuccess');
      } else {
        setError('Unexpected payment status. Please try again.');
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