import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ElementsConsumer } from '@stripe/react-stripe-js';
import { Elements  } from '@stripe/react-stripe-js';
import { fetchCartItems } from '../actions/cartActions';
import axiosInstance from '../components/axiosInstance';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Pp6A1DAYdBNDDpzWqzOXTTwS9zWqVFywfV3GgGIAqtZQDHx3iCwFAcRdxha3QYMLJOWLlRyopicdqhhDqjkOs4600Nd9YHySl');

const Checkout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const cart = useSelector((state) => state.fetchCart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosInstance.post('/api/create-payment-intent', {
          items: cartItems,
        });
        setClientSecret(response.data.clientSecret);
        console.log('Client Secret fetched:', response.data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error.response ? error.response.data : error.message);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);  // Set loading to false after trying to fetch clientSecret
      }
      
    };

    if (cartItems.length > 0) {
      fetchClientSecret();
    }
  }, [cartItems]);

  console.log("clientSecret is : ", clientSecret)

  if (loading) {
    return <div>Loading...</div>;
  }


 
  return (
    <div>
      <h2>Checkout</h2>
      {console.log('Rendering with clientSecret:', clientSecret)}
      {cartItems && cartItems.length > 0 ? (
        <div>
          <h3>Cart Items</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product._id}>
                {item.product.title} - {item.quantity} x {item.product.price} €
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

     {clientSecret ? (
         <Elements stripe={stripePromise} options={{ clientSecret }}>
           <CheckoutForm
             setError={setError}
             setSuccess={() => setSuccess(true)}
           />
       </Elements>
      ) : (
        <div>Loading...</div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment successful!</p>}
    </div>
  );
};

export default Checkout;
