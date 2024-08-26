import axiosInstance from '../components/axiosInstance';
import { jwtDecode } from 'jwt-decode'

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const GET_USER_BY_ID = 'GET_USER';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_BY_ID_FAIL = 'GET_USER_FAIL';
export const LOG_OUT = 'LOG_OUT';


export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_ID });
    const { data } = await axiosInstance.get(`/user/getuser/${userId}`);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_BY_ID_FAIL, payload: error.response.data.message });
  }
}

export const register = (userData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/user/register', userData);
    console.log("res is: ", res);
    let registeredUser = {token: res.data.token, user: jwtDecode(res.data.token).user }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: registeredUser,
    });
    localStorage.setItem('auth', JSON.stringify(registeredUser));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/user/login', userData);
    console.log("res.data: ",res.data);
    let loggedInUser = {token: res.data.token, user: jwtDecode(res.data.token).user }
    console.log("loggedInUser: ", loggedInUser);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loggedInUser,
    });
    localStorage.setItem('auth', JSON.stringify(loggedInUser));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const handleOAuthCallback = (token) => async (dispatch) => {
  try {
    let loggedInUser = {token: token, user: jwtDecode(token).user}
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loggedInUser,
    });
    localStorage.setItem('auth', JSON.stringify(loggedInUser));
  } catch (error) {
    console.error('Error in handleOAuthCallback:', error);
    dispatch({
      type: LOGIN_FAIL,
      payload: 'OAuth authentication failed',
    });
    return Promise.reject(error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');
  dispatch({
    type: LOG_OUT,
  });
}