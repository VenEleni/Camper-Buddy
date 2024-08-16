import {
    CART_INCREASE_ITEM_QUANTITY,
    CART_INCREASE_ITEM_QUANTITY_SUCCESS,
    CART_INCREASE_ITEM_QUANTITY_FAIL,
} from "../actions/cartActions";

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };

  export const cartIncreaseItemQuantityReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_INCREASE_ITEM_QUANTITY:
            return {
                ...state,
                loading: true,
            };
        case CART_INCREASE_ITEM_QUANTITY_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
                error: null,
            };
        case CART_INCREASE_ITEM_QUANTITY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default cartIncreaseItemQuantityReducer;