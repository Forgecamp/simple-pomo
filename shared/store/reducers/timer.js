import { STOP, PLAY_PAUSE_TOGGLE, RESET } from "../actions/timer";

const initialState = {
    focusLength: 20,
    shortBreakLength: 10,
    longBreakLength: 15,
    breakLength: 10,
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
        // case ADD_TASK: {
        //     const task = new Task(
        //         Date.toString().concat(`${Math.random}`),
        //         action.taskData.title
        //     );
        //     return { ...state, tasks: state.tasks.concat(task) };
        // }
        case STOP: {
            let updatedState = { ...state, isRunning: false };
            if (state.isBreak) {
                let breaks = updatedState.completedBreaks;
                if (breaks >= 2) {
                    updatedState.breakLength = updatedState.longBreakLength;
                } else {
                    updatedState.breakLength = updatedState.shortBreakLength;
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
    }

    return state;
}
