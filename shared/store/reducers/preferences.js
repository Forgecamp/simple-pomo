import { SET_HAS_LOADED, APPLY_PREFERENCES } from "../actions/preferences";

const initialState = {
    options: {},
    order: [],
    loading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case APPLY_PREFERENCES: {
            return {
                ...state,
                options: { ...state.options, ...action.options },
            };
        }
        case SET_HAS_LOADED: {
            return { ...state, loading: false };
        }
        default: {
            return state;
        }
    }
}
