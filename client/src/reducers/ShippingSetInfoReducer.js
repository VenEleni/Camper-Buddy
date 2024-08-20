import {
    SET_SHIPPING_INFO,
    SET_SHIPPING_INFO_SUCCESS,
    SET_SHIPPING_INFO_FAIL
} from '../actions/shippingActions';

const initialState = {
    loading: false,
    shippingInfo: {},
    error: null,
};

export const ShippingSetInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHIPPING_INFO:
            return { ...state, loading: true };
        case SET_SHIPPING_INFO_SUCCESS:
            return { loading: false, shippingInfo: action.payload, error: null };
        case SET_SHIPPING_INFO_FAIL:
            return { loading: false, error: action.payload, shippingInfo: {} };
        default:
            return state;
    }
};

export default ShippingSetInfoReducer;