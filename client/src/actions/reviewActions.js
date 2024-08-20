import axiosInstance from "../components/axiosInstance";

export const CREATE_REVIEW = "CREATE_REVIEW";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
export const CREATE_REVIEW_FAIL = "CREATE_REVIEW_FAIL";
export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAIL = "FETCH_REVIEWS_FAIL";

export const createReview =
  (productId, reviewData) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW });
      const { auth } = getState();
      const token = auth.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const { data } = await axiosInstance.post(
        `/reviews/${productId}/addreview`,
        reviewData,
        config
      );
      dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const fetchReviews = (productId) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_REVIEWS });
      const { data } = await axiosInstance.get(`/reviews/${productId}/reviews`);
      dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_REVIEWS_FAIL, payload: error.response.data.message });
    }
  }
