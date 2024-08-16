import {
    CART_REDUCE_ITEM_QUANTITY,
    CART_REDUCE_ITEM_QUANTITY_SUCCESS,
    CART_REDUCE_ITEM_QUANTITY_FAIL,
} from "../actions/cartActions";

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };

export const cartReduceItemQuantityReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_REDUCE_ITEM_QUANTITY:
            return {
                ...state,
                loading: true,
            };
        case CART_REDUCE_ITEM_QUANTITY_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
                error: null,
            };
        case CART_REDUCE_ITEM_QUANTITY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default cartReduceItemQuantityReducer