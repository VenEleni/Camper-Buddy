import axiosInstance from "../components/axiosInstance";

export const SET_SHIPPING_INFO = 'SET_SHIPPING_INFO';
export const SET_SHIPPING_INFO_SUCCESS = 'SET_SHIPPING_INFO_SUCCESS';
export const SET_SHIPPING_INFO_FAIL = 'SET_SHIPPING_INFO_FAIL';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAIL = 'FETCH_ORDERS_FAIL';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAIL = 'UPDATE_ORDER_STATUS_FAIL';

export const setShippingInfo = (orderData) => async (dispatch, getState) => {
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
    const { data } = await axiosInstance.post("/order/neworder", orderData, config);
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

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ORDERS });
    const { auth } = getState();
    const token = auth.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axiosInstance.get("/order/getallorders", config);
    dispatch({
      type: FETCH_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateOrderStatus = (orderId, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_ORDER_STATUS });
        const { auth } = getState();
        const token = auth.token;
        const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
        },
        };
        const { data } = await axiosInstance.put(`/order/updateorder/${orderId}`, { status }, config);
        dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: data,
        });
    } catch (error) {
        dispatch({
        type: UPDATE_ORDER_STATUS_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};
