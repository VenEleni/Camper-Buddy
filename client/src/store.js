import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productCreateReducer from './reducers/productCreateReducer';
import productsFetchReducer from './reducers/productsFetchReducer';
import removeFromCartReducer from './reducers/cartRemoveItemReducer';
import fetchFilteredProductsReducer from './reducers/productsFilterFetchReducer';
import shippingSetInfoReducer from './reducers/shippingSetInfoReducer';
import ordersFetchReducer from './reducers/ordersFetchReducer';
import orderUpdateStatusReducer from './reducers/orderUpdateStatusReducer';
import reviewCreateReducer from './reducers/reviewCreateReducer';
import reviewFetchReducer from './reducers/reviewFetchReducer';
import userFetchByIdReducer from './reducers/userFetchByIdReducer';
import cartReducer from './reducers/cartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    productCreate: productCreateReducer,
    productsFetch: productsFetchReducer,
    cartReducer: cartReducer,
    fetchFilteredProducts: fetchFilteredProductsReducer,
    shippingSetInfo: shippingSetInfoReducer,
    ordersFetch: ordersFetchReducer,
    updateOrderStatus: orderUpdateStatusReducer,
    reviewCreate: reviewCreateReducer,
    reviewFetch: reviewFetchReducer,
    userFetchById: userFetchByIdReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

