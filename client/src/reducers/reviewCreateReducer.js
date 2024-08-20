import {
    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL
  } from "../actions/reviewActions";


  const initialCreateReviewState   = {
    loading: false,
    review: {},
    error: null,
  };

  export const reviewCreateReducer = (state = initialCreateReviewState, action) => {
    switch (action.type) {
      case CREATE_REVIEW:
        return { ...state, loading: true };
      case CREATE_REVIEW_SUCCESS:
        return { ...state, loading: false, review: action.payload };
      case CREATE_REVIEW_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };    

  export default reviewCreateReducer;