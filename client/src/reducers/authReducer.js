import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT
} from "../actions/authActions";
import {jwtDecode} from "jwt-decode";

let initialState;

try {
  const authData = localStorage.getItem("auth");
  if (authData) {
    const parsedAuthData = JSON.parse(authData);
    const decodedToken = jwtDecode(parsedAuthData.token);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("auth");
      initialState = {
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    } else {
      initialState = {
        token: parsedAuthData.token,
        isAuthenticated: true,
        user: parsedAuthData.user,
        error: null,
      };
    }
  } else {
    initialState = {
      token: null,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  }
} catch (error) {
  console.error("Error parsing auth data from localStorage:", error);
  initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    error: null,
  };
}

const authReducer = (state = initialState, action) => {
  console.log('Auth Reducer - Action:', action.type, 'Payload:', action.payload);
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log("Reducer action payload:", action.payload);
      const newState = {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
      console.log("New state:", newState);
      return newState;
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      case LOG_OUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          error: null,
        };
    default:
      return state;
  }
};


export default authReducer;
