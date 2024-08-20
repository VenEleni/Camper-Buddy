import {
    FETCH_REVIEWS,
    FETCH_REVIEWS_SUCCESS,
    FETCH_REVIEWS_FAIL
  } from "../actions/reviewActions";


  const initialReviewState  = {
    loading: false,
    reviews: [],
    error: null,
  };

  export const reviewFetchReducer = (state = initialReviewState, action) => {
    switch (action.type) {
      case FETCH_REVIEWS:
        return { ...state, loading: true };
      case FETCH_REVIEWS_SUCCESS:
        return { ...state, loading: false, reviews: action.payload };
      case FETCH_REVIEWS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default reviewFetchReducer;