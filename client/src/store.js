import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productCreateReducer from './reducers/productCreateReducer';
import productsFetchReducer from './reducers/productsFetchReducer';
import addToCartReducer from './reducers/cartReducers';
import fetchCartItems from './reducers/cartItemsFetchReducer';
import removeFromCartReducer from './reducers/cartRemoveItemReducer';
import cartReduceItemQuantityReducer from './reducers/cartReduceItemQuantityReducer';
import cartIncreaseItemQuantityReducer from './reducers/cartIncreaseQuantityReducer';
import fetchFilteredProductsReducer from './reducers/productsFilterFetchReducer';
import cartClearCartReducer from './reducers/cartClearCartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    productCreate: productCreateReducer,
    productsFetch: productsFetchReducer,
    addToCart: addToCartReducer,
    fetchCart: fetchCartItems,
    removeFromCart: removeFromCartReducer,
    reduceQuantityFromCart: cartReduceItemQuantityReducer,
    increaseQuantityFromCart: cartIncreaseItemQuantityReducer,
    fetchFilteredProducts: fetchFilteredProductsReducer,
    clearCart: cartClearCartReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

