import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default authReducer;
