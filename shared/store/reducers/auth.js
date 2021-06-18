import { AUTHENTICATE } from "../actions/auth";
const initialState = {
    uid: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE: {
            return {
                ...state,
                uid: action.uid,
            };
        }
        default: {
            return state;
        }
    }
}
