// src/redux/reducers/productReducer.js
import {
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL
  } from '../actions/productActions';
  
  const initialState = {
    loading: false,
    product: {},
    error: null,
  };
  
  export const productCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
        return { ...state, loading: true };
      case CREATE_PRODUCT_SUCCESS:
        return { loading: false, product: action.payload, error: null };
      case CREATE_PRODUCT_FAIL:
        return { loading: false, error: action.payload, product: {} };
      default:
        return state;
    }
  };

  
  export default productCreateReducer;