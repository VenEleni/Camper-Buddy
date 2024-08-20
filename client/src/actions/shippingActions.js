import axiosInstance from "../components/axiosInstance";

export const SET_SHIPPING_INFO = 'SET_SHIPPING_INFO';
export const SET_SHIPPING_INFO_SUCCESS = 'SET_SHIPPING_INFO_SUCCESS';
export const SET_SHIPPING_INFO_FAIL = 'SET_SHIPPING_INFO_FAIL';

export const setShippingInfo = (shippingData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_SHIPPING_INFO });
    const { auth } = getState();
    const token = auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axiosInstance.post("/order/neworder", shippingData, config);
    dispatch({
      type: SET_SHIPPING_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_SHIPPING_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}