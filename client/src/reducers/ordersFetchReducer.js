import {
    FETCH_ORDERS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
} from '../actions/shippingActions';

const initialState = {
    loading: false,
    orders: [],
    error: null,
  };

export const ordersFetchReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
          return { ...state, loading: true };
        case FETCH_ORDERS_SUCCESS:
          return { loading: false, orders: action.payload, error: null };
        case FETCH_ORDERS_FAIL:
          return { loading: false, error: action.payload, orders: [] };
        default:
          return state;
      } 
}

export default ordersFetchReducer;