export const PLAY_PAUSE_TOGGLE = "PLAY_PAUSE_TOGGLE";
export const STOP = "STOP";
export const RESET = "RESET";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const EDIT_TASK = "EDIT_TASK";

export const playPauseToggle = (noteId = false, endTime = null) => {
    return {
        type: PLAY_PAUSE_TOGGLE,
        noteId: noteId,
        endTime: endTime,
    };
};

export const stop = () => {
    return {
        type: STOP,
    };
};
export const reset = () => {
    return {
        type: RESET,
    };
};
export const addTask = (title) => {
    return {
        type: ADD_TASK,
        taskData: {
            title: title,
        },
    };
};
export const removeTask = () => {
    return {
        type: REMOVE_TASK,
    };
};
export const completeTask = () => {
    return {
        type: COMPLETE_TASK,
    };
};
export const editTask = (taskId, newTitle) => {
    return {
        type: EDIT_TASK,
        taskData: {
            taskId: taskId,
            newTitle: newTitle,
        },
    };
};
