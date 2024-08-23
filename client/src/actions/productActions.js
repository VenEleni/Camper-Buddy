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
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";
export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAIL = "GET_PRODUCT_FAIL";

export const createProduct = (productData) => async (dispatch,getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { auth } = getState();
    const token = auth.token;

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

  export const getProductToUpdate = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRODUCT });
      const { data } = await axiosInstance.get(`/product/product/${id}`);
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

  export const updateProduct = (productData) => async (dispatch, getState) => { 
    try {
      const { auth } = getState();
    const token = auth.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
      dispatch({ type: UPDATE_PRODUCT });
      const { data } = await axiosInstance.put(`/product/updateproduct/${productData._id}`, productData, config);
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS, 
        payload: data,
      });
    } catch (error) {
      dispatch({  
        type: UPDATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }