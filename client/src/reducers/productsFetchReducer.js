import {
    FETCH_ALL_PRODUCTS,
    FETCH_ALL_PRODUCTS_SUCCESS,
    FETCH_ALL_PRODUCTS_FAIL
  } from '../actions/productActions';

  const initialState = {
    loading: false,
    products: [],
    error: null,
  };

  export const fetchProductsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
          return { ...state, loading: true };
        case FETCH_ALL_PRODUCTS_SUCCESS:
          return { loading: false, products: action.payload, error: null };
        case FETCH_ALL_PRODUCTS_FAIL:
          return { loading: false, error: action.payload, products: [] };
        default:
          return state;
      }
  }

  export default fetchProductsReducer;