import {
    FETCH_FILTERED_PRODUCTS,
    FETCH_FILTERED_PRODUCTS_SUCCESS,
    FETCH_FILTERED_PRODUCTS_FAIL
  } from '../actions/productActions';

  const initialState = {
    loading: false,
    filteredProducts: [],
    error: null,
  };

  export const fetchFilteredProductsReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILTERED_PRODUCTS:
          return { ...state, loading: true };
        case FETCH_FILTERED_PRODUCTS_SUCCESS:
            console.log('FETCH_FILTERED_PRODUCTS_SUCCESS payload:', action.payload);
          return { 
            ...state,
            loading: false, filteredProducts: action.payload, error: null };
        case FETCH_FILTERED_PRODUCTS_FAIL:
          return { loading: false, error: action.payload, products: [] };
        default:
          return state;
      }
  }

  export default fetchFilteredProductsReducer;