import { STOP, PLAY_PAUSE_TOGGLE, RESET } from "../actions/timer";
import { APPLY_PREFERENCES } from "../actions/preferences";

const initialState = {
    focusLength: 1500,
    shortBreakLength: 300,
    longBreakLength: 900,
    isLongBreak: false,
    breakLength: 300,
    timeElapsed: 0,
    startTime: null,
    endTime: null,
    completedBreaks: 0,
    notificationId: null,
    isBreak: false,
    key: 0,
    isRunning: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case STOP: {
            let updatedState = { ...state, isRunning: false };
            if (state.isBreak) {
                let breaks = updatedState.completedBreaks;
                if (breaks >= 2) {
                    updatedState.breakLength = updatedState.longBreakLength;
                    updatedState.currentBreak = "long";
                } else {
                    updatedState.breakLength = updatedState.shortBreakLength;
                    updatedState.currentBreak = "short";
                }
                if (breaks >= 2) breaks = -2;
                updatedState.completedBreaks = breaks + 1;
            }
            updatedState.isBreak = !state.isBreak;
            updatedState.key = updatedState.key + 1;
            updatedState.timeElapsed = 0;
            updatedState.endTime = null;
            updatedState.startTime = null;
            return {
                ...state,
                ...updatedState,
            };
        }
        case PLAY_PAUSE_TOGGLE: {
            const currTime = new Date().getTime();
            const updatedState = { ...state };
            if (updatedState.isRunning) {
                updatedState.timeElapsed =
                    updatedState.timeElapsed +
                    currTime -
                    updatedState.startTime;
            } else {
                updatedState.startTime = currTime;
                updatedState.endTime = action.endTime;
                updatedState.notificationId = action.noteId;
            }
            updatedState.isRunning = !updatedState.isRunning;
            return {
                ...state,
                ...updatedState,
            };
        }
        case RESET: {
            const updatedState = { ...state };
            updatedState.isRunning = false;
            updatedState.key = updatedState.key + 1;
            updatedState.timeElapsed = 0;

            return {
                ...state,
                ...updatedState,
            };
        }
        case APPLY_PREFERENCES: {
            return {
                ...state,
                key: state.key + 1,
                isRunning: false,
                focusLength: action.options.defaultFocus.value,
                shortBreakLength: action.options.defaultShortBreak.value,
                longBreakLength: action.options.defaultLongBreak.value,
                breakLength: state.isLongBreak
                    ? action.options.defaultLongBreak.value
                    : action.options.defaultShortBreak.value,
            };
        }
    }

    return state;
}
