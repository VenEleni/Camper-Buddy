import {
  CART_CLEAR,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,
} from "../actions/cartActions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartClearCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_CLEAR:
      return {
        ...state,
        loading: true,
      };
    case CART_CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [],
        error: null,
      };
    case CART_CLEAR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartClearCartReducer;
