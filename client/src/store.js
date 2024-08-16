import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productCreateReducer from './reducers/productCreateReducer';
import productsFetchReducer from './reducers/productsFetchReducer';
import addToCartReducer from './reducers/cartReducers';
import fetchCartItems from './reducers/cartItemsFetchReducer';
import removeFromCartReducer from './reducers/cartRemoveItemReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    productCreate: productCreateReducer,
    productsFetch: productsFetchReducer,
    addToCart: addToCartReducer,
    fetchCart: fetchCartItems,
    removeFromCart: removeFromCartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

