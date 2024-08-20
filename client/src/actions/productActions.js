import axiosInstance from "../components/axiosInstance";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAIL = "CREATE_PRODUCT_FAIL";
export const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS";
export const FETCH_ALL_PRODUCTS_SUCCESS = "FETCH_ALL_PRODUCTS_SUCCESS";
export const FETCH_ALL_PRODUCTS_FAIL = "FETCH_ALL_PRODUCTS_FAIL";
export const FETCH_FILTERED_PRODUCTS = "FETCH_FILTERED_PRODUCTS";
export const FETCH_FILTERED_PRODUCTS_SUCCESS = "FETCH_FILTERED_PRODUCTS_SUCCESS";
export const FETCH_FILTERED_PRODUCTS_FAIL = "FETCH_FILTERED_PRODUCTS_FAIL";

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const token = localStorage.getItem("token"); // Get token from localStorage

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token, // Add the token to the request headers
      },
    };

    const { data } = await axiosInstance.post(
      "/product/addproduct",
      productData,
      config
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_PRODUCTS });
    const { data } = await axiosInstance.get("/product/allproducts");
    dispatch({
      type: FETCH_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProductsByCategory = (category, subcategory) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_FILTERED_PRODUCTS });
      const query = new URLSearchParams({category, subcategory }).toString();
    const { data } = await axiosInstance.get(`/product/filterproducts?${query}`);
      dispatch({
        type: FETCH_FILTERED_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_FILTERED_PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
