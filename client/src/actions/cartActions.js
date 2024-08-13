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
    const token = localStorage.getItem('token'); // Get token from localStorage
    const { auth } = getState(); // Get the auth state
    const userId = auth.user ? auth.user.id : null;
    console.log("auth.user in cartAction as I took it using getState: ", auth.user)
  
      const config = {
        headers: {
          'x-auth-token': token, // Add the token to the request headers
        },
      };
    const { data } = await axiosInstance.post('/cart/addToCart', {
      userId,
      productId,
    }, config);
    dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
    // localStorage.setItem("cartItems", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
  }
};

export const fetchCartItems = () => async (dispatch) => {
    console.log("I'm in the fetchCartItems for user");
  try {
    dispatch({ type: FETCH_CART_ITEMS });
    const token = localStorage.getItem('token'); // Get token from localStorage
  
      const config = {
        headers: {
          'x-auth-token': token, // Add the token to the request headers
        },
      };
    const { data } = await axiosInstance.get('/cart/fetchCart', config);
    console.log("cart data just received", data);
    dispatch({ type: FETCH_CART_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CART_ITEMS_FAIL, payload: error.message });
  }
};
