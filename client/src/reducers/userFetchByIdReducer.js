import {
    GET_USER_BY_ID,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_FAIL
} from "../actions/authActions";

const initialUserFetchByIdState = {
    loading: false,
    user: {},
    error: null,
};

export const userFetchByIdReducer = (state = initialUserFetchByIdState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID:
            return { ...state, loading: true };
        case GET_USER_BY_ID_SUCCESS:
            return { loading: false, user: action.payload, error: null };
        case GET_USER_BY_ID_FAIL:
            return { loading: false, error: action.payload, user: {} };
        default:
            return state;
    }
};

export default userFetchByIdReducer;