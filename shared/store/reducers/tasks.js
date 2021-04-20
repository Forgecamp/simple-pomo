import {
    ADD_TASK,
    REMOVE_TASK,
    EDIT_TASK,
    COMPLETE_TASK,
    STOP,
    PLAY_PAUSE_TOGGLE,
    RESET,
} from "../actions/tasks";
import Task from "../../models/task";

const initialState = {
    focusLength: 20,
    shortBreakLength: 10,
    longBreakLength: 15,
    breakLength: 10,
    timeElapsed: 0,
    startTime: null,
    completedBreaks: 0,
    notificationId: null,
    isBreak: false,
    key: 0,
    isRunning: false,
    tasks: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            const task = new Task(
                Date.toString().concat(`${Math.random}`),
                action.taskData.title
            );
            return { ...state, tasks: state.tasks.concat(task) };
        }
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
            return {
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
                updatedState.notificationId = action.noteId;
            }
            updatedState.isRunning = !updatedState.isRunning;
            return { ...updatedState };
        }
    }

    return state;
}
