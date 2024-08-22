import {
    CREATE_BLOG,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    FETCH_BLOGS,
    FETCH_BLOGS_SUCCESS,
    FETCH_BLOGS_FAIL,
    FETCH_BLOG,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_FAIL,
} from "../actions/blogActions";

const initialState = {
    blogs: [],
    loading: false,
    error: null,
  };

export const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
        case CREATE_BLOG:
        case FETCH_BLOG:
        return {
            ...state,
            loading: true,
        };
        case FETCH_BLOGS_SUCCESS:
        case CREATE_BLOG_SUCCESS:
        case FETCH_BLOG_SUCCESS:
        return {
            ...state,
            blogs: action.payload,
            loading: false,
            error: null,
        };
        case FETCH_BLOGS_FAIL:
        case CREATE_BLOG_FAIL:
        case FETCH_BLOG_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        default:
        return state;
    }
    };

    export default blogReducer;