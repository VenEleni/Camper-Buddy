import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import productCreateReducer from './reducers/productCreateReducer';
import productsFetchReducer from './reducers/productsFetchReducer';
import fetchFilteredProductsReducer from './reducers/productsFilterFetchReducer';
import shippingSetInfoReducer from './reducers/shippingSetInfoReducer';
import ordersFetchReducer from './reducers/ordersFetchReducer';
import orderUpdateStatusReducer from './reducers/orderUpdateStatusReducer';
import reviewCreateReducer from './reducers/reviewCreateReducer';
import reviewFetchReducer from './reducers/reviewFetchReducer';
import userFetchByIdReducer from './reducers/userFetchByIdReducer';
import cartReducer from './reducers/cartReducer';
import blogReducer from './reducers/blogReducers';
import productUpdateReducer from './reducers/productUpdateReducer';
import { loggingMiddleware } from './loggingMiddleware';

const rootReducer = {
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
  blogReducer: blogReducer,
  productUpdateReducer: productUpdateReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(loggingMiddleware)
});

export default store;

