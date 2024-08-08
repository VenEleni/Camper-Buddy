import axios from 'axios';

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/user/register', userData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/user/login', userData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
