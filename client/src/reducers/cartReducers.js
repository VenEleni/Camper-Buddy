import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
} from "../actions/cartActions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        error: null,
      };
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addToCartReducer;
