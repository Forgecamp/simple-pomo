import {
    SET_HAS_LOADED,
    APPLY_PREFERENCES,
    SET_IS_LOADING,
    CLOUD_OPT_OUT,
    CLOUD_OPT_IN,
} from "../actions/preferences";

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
        case SET_IS_LOADING: {
            return { ...state, loading: true };
        }
        case CLOUD_OPT_OUT: {
            return {
                ...state,
                options: {
                    ...state.options,
                    cloudStorage: {
                        desc: "Store tasks on the cloud:",
                        fullName: "Cloud Sync",
                        key: 6,
                        name: "cloudStorage",
                        value: 0,
                    },
                },
            };
        }
        case CLOUD_OPT_IN: {
            return {
                ...state,
                options: {
                    ...state.options,
                    cloudStorage: {
                        desc: "Store tasks on the cloud:",
                        fullName: "Cloud Sync",
                        key: 6,
                        name: "cloudStorage",
                        value: 1,
                    },
                },
            };
        }
        default: {
            return state;
        }
    }
}
