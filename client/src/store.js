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
import shippingSetInfoReducer from './reducers/shippingSetInfoReducer';
import ordersFetchReducer from './reducers/ordersFetchReducer';
import orderUpdateStatusReducer from './reducers/orderUpdateStatusReducer';
import reviewCreateReducer from './reducers/reviewCreateReducer';
import reviewFetchReducer from './reducers/reviewFetchReducer';

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
    clearCart: cartClearCartReducer,
    shippingSetInfo: shippingSetInfoReducer,
    ordersFetch: ordersFetchReducer,
    updateOrderStatus: orderUpdateStatusReducer,
    reviewCreate: reviewCreateReducer,
    reviewFetch: reviewFetchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

