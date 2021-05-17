import {
    SET_FOCUS,
    SET_SHORT_BREAK,
    SET_LONG_BREAK,
    TOGGLE_AUTO_CONTINE,
    TOGGLE_SOUND,
    TOGGLE_CLOUD,
} from "../actions/preferences";

const initialState = {
    defaultFocus: 1500,
    defaultShortBreak: 300,
    defaultLongBreak: 900,
    focusLength: 1500,
    shortBreakLength: 300,
    longBreakLength: 900,
    autoContinue: false,
    cloudStorage: false,
    useSound: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_FOCUS: {
            return { ...state, focusLength: action.length };
        }
        case SET_SHORT_BREAK: {
            return { ...state, shortBreakLength: action.length };
        }
        case SET_LONG_BREAK: {
            return { ...state, longBreakLength: action.length };
        }
        case TOGGLE_AUTO_CONTINE: {
            return { ...state, autoContinue: !state.autoContinue };
        }
        case TOGGLE_SOUND: {
            return { ...state, useSound: !state.useSound };
        }
        case TOGGLE_CLOUD: {
            return { ...state, cloudStorage: !state.cloudStorage };
        }
        default: {
            return state;
        }
    }
}
