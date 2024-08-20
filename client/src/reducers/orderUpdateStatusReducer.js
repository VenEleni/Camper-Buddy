import {
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAIL,
} from '../actions/shippingActions';

const initialState = {
    loading: false,
    order: [],
    error: null,
  };

export const orderUpdateStatusReducer = ( state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ORDER_STATUS:
          return { ...state, loading: true };
        case UPDATE_ORDER_STATUS_SUCCESS:
          return { loading: false, order: action.payload, error: null };
        case UPDATE_ORDER_STATUS_FAIL:
          return { loading: false, error: action.payload, order: [] };
        default:
          return state;
      }
};

export default orderUpdateStatusReducer;