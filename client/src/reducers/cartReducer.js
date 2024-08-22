import {
    FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_SUCCESS,
  FETCH_CART_ITEMS_FAIL,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INCREASE_ITEM_QUANTITY,
  CART_REDUCE_ITEM_QUANTITY,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REDUCE_ITEM_QUANTITY_SUCCESS,
  CART_INCREASE_ITEM_QUANTITY_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_REDUCE_ITEM_QUANTITY_FAIL,
  CART_INCREASE_ITEM_QUANTITY_FAIL,
  CART_REMOVE_ITEM_FAIL,
  CART_CLEAR,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL,
} from "../actions/cartActions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
    case CART_ADD_ITEM:
    case CART_REMOVE_ITEM:
    case CART_INCREASE_ITEM_QUANTITY:
    case CART_REDUCE_ITEM_QUANTITY:
    case CART_CLEAR:
      return {
        ...state,
        loading: true,
      };
    case CART_ADD_ITEM_SUCCESS:
    case FETCH_CART_ITEMS_SUCCESS:
    case CART_REMOVE_ITEM_SUCCESS:
    case CART_REDUCE_ITEM_QUANTITY_SUCCESS:
    case CART_INCREASE_ITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        cartItems: action.payload, // Always update cartItems with the new payload
        loading: false,
        error: null,
      };
    case FETCH_CART_ITEMS_FAIL:
    case CART_ADD_ITEM_FAIL:
    case CART_REDUCE_ITEM_QUANTITY_FAIL:
    case CART_REMOVE_ITEM_FAIL:
    case CART_CLEAR_FAIL:
    case CART_INCREASE_ITEM_QUANTITY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CART_CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [],
        error: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
