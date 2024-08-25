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
import './CheckOut.css';

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
    setShowPaymentForm(true); // Show the payment form
  };

  const cartState = useSelector((state) => state.cartReducer);
  const { cartItems } = cartState;

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


  const orderData = {
    ...shippingData,
    products: cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
  };

 
  return (
    <div className="container mx-auto p-6">
      {!showPaymentForm ? (
        <Form onSubmit={handleShippingSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
          <h5 className="text-xl font-semibold mb-6 text-black">Please fill the form with your shipping information</h5>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="font-medium text-black">Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                name="email"
                value={shippingData.email}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label className="font-medium text-black">Phone Number</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Phone Number" 
                name="phone"
                value={shippingData.phone}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridFullName">
              <Form.Label className="font-medium text-black">Full Name</Form.Label>
              <Form.Control 
                placeholder="Enter your full name"  
                type="text"
                name="fullName"
                value={shippingData.fullName}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label className="font-medium text-black">Address</Form.Label>
              <Form.Control 
                placeholder="1234 Main St"  
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCountry">
              <Form.Label className="font-medium text-black">Country</Form.Label>
              <Form.Control 
                type="text"
                name="country"
                value={shippingData.country}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPostalCode">
              <Form.Label className="font-medium text-black">Postal Code</Form.Label>
              <Form.Control 
              
                type="text" 
                name="postalCode"
                value={shippingData.postalCode}
                onChange={handleShippingChange}
                required 
                className="border-gray-300 rounded-lg text-black"
              />
            </Form.Group>
          </Row>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Check Out
          </Button>
        </Form>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            setError={setError}
            setSuccess={() => setSuccess(true)}
            orderData={orderData} // Pass the order data here
          />
        </Elements>
      ) : (
        <div className="text-center text-gray-700">Loading...</div>
      )}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">Payment successful!</p>}
    </div>
  );
};

export default Checkout;
