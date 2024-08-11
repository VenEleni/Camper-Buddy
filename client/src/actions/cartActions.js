import axiosInstance from '../components/axiosInstance';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_ADD_ITEM_SUCCESS = 'CART_ADD_ITEM_SUCCESS';
export const CART_ADD_ITEM_FAIL = 'CART_ADD_ITEM_FAIL';

export const addToCart = (userId, productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_ADD_ITEM });
        const { data } = await axiosInstance.post('/cart/addToCart', {
            userId,
            productId
            });
            dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
            localStorage.setItem('cartItems', JSON.stringify(data));
} catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
}
}