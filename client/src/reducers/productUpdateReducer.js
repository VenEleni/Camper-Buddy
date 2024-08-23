import {
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
} from '../actions/productActions';

const initialState = {
    loading: false,
    product: {},
    error: null,
  };

export const productUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return { ...state, loading: true };
        case UPDATE_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload, error: null };
        case UPDATE_PRODUCT_FAIL:
            return { loading: false, error: action.payload, product: {} };
        case GET_PRODUCT:
            return { ...state, loading: true };
        case GET_PRODUCT_SUCCESS:
            return { loading: false, product: action.payload, error: null };
        case GET_PRODUCT_FAIL:
            return { loading: false, error: action.payload, product: {} };
        default:
            return state;
    }   
}

export default productUpdateReducer;