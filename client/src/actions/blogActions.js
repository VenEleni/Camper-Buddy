import axiosInstance from "../components/axiosInstance";

export const CREATE_BLOG = 'CREATE_BLOG';
export const CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS';
export const CREATE_BLOG_FAIL = 'CREATE_BLOG_FAIL';
export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAIL = 'FETCH_BLOGS_FAIL';
export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS';
export const FETCH_BLOG_FAIL = 'FETCH_BLOG_FAIL';

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_BLOG });
    const { auth } = getState();
    const token = auth.token;

    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    const { data } = await axiosInstance.post('/blog/createblog', blog, config);

    dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_BLOG_FAIL, payload: error.message });
  }
}

export const fetchBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOGS });
    const { data } = await axiosInstance.get('/blog/getblogs');

    dispatch({ type: FETCH_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BLOGS_FAIL, payload: error.message });
  }
}

export const fetchBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BLOG });
    const { data } = await axiosInstance.get(`/blog/getblog/${id}`);

    dispatch({ type: FETCH_BLOG_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_BLOG_FAIL, payload: error.message });
  }
}