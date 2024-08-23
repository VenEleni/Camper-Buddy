import React, { useState } from 'react';
import { PaymentElement,  useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { clearCart } from '../actions/cartActions';
import { setShippingInfo } from '../actions/shippingActions';
import { useNavigate } from "react-router-dom";
import './CheckOut.css';

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
    <form 
    className="bg-white shadow-md rounded-lg p-12 max-w-md mx-auto text-black"
    onSubmit={handleSubmit}
  >
    <div className="mb-4">
      <PaymentElement className="border border-gray-300 p-3 rounded-lg" />
    </div>
    <button 
      type="submit" 
      disabled={loading || !stripe || !elements}
      className={`w-full py-3 px-4 rounded-lg text-white transition-colors duration-300  ${
        loading || !stripe || !elements ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {loading ? 'Processing...' : 'Pay'}
    </button>
  </form>
  );
};

export default CheckoutForm;