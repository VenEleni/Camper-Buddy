import axiosInstance from "../components/axiosInstance";

export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_ADD_ITEM_SUCCESS = "CART_ADD_ITEM_SUCCESS";
export const CART_ADD_ITEM_FAIL = "CART_ADD_ITEM_FAIL";
export const FETCH_CART_ITEMS = "FETCH_CART_ITEMS";
export const FETCH_CART_ITEMS_SUCCESS = "FETCH_CART_ITEMS_SUCCESS";
export const FETCH_CART_ITEMS_FAIL = "FETCH_CART_ITEMS_FAIL";

export const addToCart = (userId, productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM });
    const { data } = await axiosInstance.post("/cart/addToCart", {
      userId,
      productId,
    });
    dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
    localStorage.setItem("cartItems", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CART_ITEMS });
    const { data } = await axiosInstance.get("/cart/fetchCart");
    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CART_ITEMS_FAIL, payload: error.message });
  }
};
