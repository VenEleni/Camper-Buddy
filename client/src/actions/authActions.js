import axiosInstance from '../components/axiosInstance';
import { jwtDecode } from 'jwt-decode'

// Action Types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';


export const register = (userData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/user/register', userData);
    console.log("res is: ", res);
    let registeredUser = {token: res.data.token, user: jwtDecode(res.data.token).user }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: registeredUser,
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
    const res = await axiosInstance.post('/user/login', userData);
    console.log("res.data: ",res.data);
    let loggedInUser = {token: res.data.token, user: jwtDecode(res.data.token).user }
    console.log("loggedInUser: ", loggedInUser);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loggedInUser,
    });
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
