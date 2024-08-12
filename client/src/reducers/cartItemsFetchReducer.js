import {
  FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
} from "../actions/cartActions";

const initialState = {
  loading: false,
  products: [],
  error: null,
};

export const fetchCartItems = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_CART_ITEMS_FAIL:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
