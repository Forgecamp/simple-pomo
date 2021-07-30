import {
    AUTHENTICATE,
    SET_USER,
    SET_USER_LOADING,
    SET_USER_LOADED,
} from "../actions/auth";
const initialState = {
    uid: undefined,
    loading: false,
    attemptedLogin: false,
    res: "n/a",
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                uid: action.uid,
            };
        }
        case SET_USER_LOADING: {
            return {
                ...state,
                loading: true,
            };
        }
        case SET_USER_LOADED: {
            return {
                ...state,
                loading: false,
            };
        }
        case "STORE_RES": {
            return {
                ...state,
                res: action.res,
            };
        }
        default: {
            return state;
        }
    }
}
