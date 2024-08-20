import React from 'react';
// import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Home from './pages/Homepage'
import 'beercss/dist/cdn/beer.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/NavBar';
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import Eshop from './pages/Eshop'
import CreateProduct from './pages/CreateProduct'
import FetchCart from './pages/Cart'
// import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './pages/CheckOut';
import OrderSuccess from './components/OrderSuccess';

// const stripePromise = loadStripe('pk_test_51Pp6A1DAYdBNDDpzWqzOXTTwS9zWqVFywfV3GgGIAqtZQDHx3iCwFAcRdxha3QYMLJOWLlRyopicdqhhDqjkOs4600Nd9YHySl');

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/eshop' element={<Eshop />}/>
        <Route path='/createproduct' element={<CreateProduct />}/>
        <Route path='/cart' element={<FetchCart />}/>
        <Route path='/ordersuccess' element={<OrderSuccess />}/>
        <Route
            path='/checkout'
            element={<Checkout />}  // Remove <Elements> from here
          />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
