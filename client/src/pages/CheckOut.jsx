import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements  } from '@stripe/react-stripe-js';
import { fetchCartItems } from '../actions/cartActions';
import axiosInstance from '../components/axiosInstance';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import {setShippingInfo} from '../actions/shippingActions';
import { clearCart } from '../actions/cartActions';

const stripePromise = loadStripe('pk_test_51Pp6A1DAYdBNDDpzWqzOXTTwS9zWqVFywfV3GgGIAqtZQDHx3iCwFAcRdxha3QYMLJOWLlRyopicdqhhDqjkOs4600Nd9YHySl');

const Checkout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [shippingData, setShippingData] = useState({
    address: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    fullName: ''
  });

  const handleShippingChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      ...shippingData,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };
    try {
      await dispatch(setShippingInfo(orderData));
      await dispatch(clearCart()); // Dispatch the order data to the backend
      setShowPaymentForm(true); // Show the payment form
    } catch (error) {
      console.error("Error setting shipping info: ", error);
    }
  };

  // const handlePaymentSuccess = async () => {
  //   try {
  //     await dispatch(clearCart()); // Clear the cart after the order is placed
  //     setSuccess(true);
  //   } catch (error) {
  //     console.error("Error placing order: ", error);
  //   }
  // };

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
    <div className='ml-96'>
{!showPaymentForm ? (
        <Form onSubmit={handleShippingSubmit}>
        <h5 className='mb-16'>Please fill the form with your shipping information</h5>
      <Row className="mb-3" >
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email"
            value={shippingData.email}
            onChange={handleShippingChange}
            required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="number" placeholder="Phone Number" name="phone"
            value={shippingData.phone}
            onChange={handleShippingChange}
            required />
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="formGridFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control placeholder="Enter your full name"  type="text"
            name="fullName"
            value={shippingData.fullName}
            onChange={handleShippingChange}
            required />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St"  type="text"
            name="address"
            value={shippingData.address}
            onChange={handleShippingChange}
            required />
      </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control  type="text"
            name="country"
            value={shippingData.country}
            onChange={handleShippingChange}
            required/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPostalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type="text" name="postalCode"
            value={shippingData.postalCode}
            onChange={handleShippingChange}
            required/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Check Out
      </Button>
    </Form>
) : (
     clientSecret ? (
         <Elements stripe={stripePromise} options={{ clientSecret }}>
           <CheckoutForm
             setError={setError}
             setSuccess={() => setSuccess(true)}
           />
       </Elements>
      ) : (
        <div>Loading...</div>
      )
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Payment successful!</p>}
    </div>
  );
};

export default Checkout;
