export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const INCREMENT_TASK = "INCREMENT_TASK";
export const DECREMENT_TASK = "DECREMENT_TASK";

export const addTask = (title) => {
    return {
        type: ADD_TASK,
        taskData: {
            title: title,
        },
    };
};
export const removeTask = (taskId) => {
    return {
        type: REMOVE_TASK,
        taskId: taskId,
    };
};
export const completeTask = (taskId) => {
    return {
        type: COMPLETE_TASK,
        taskId: taskId,
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
export const incrementTask = (taskId) => {
    return {
        type: INCREMENT_TASK,
        taskId: taskId,
    };
};
export const decrementTask = (taskId) => {
    return {
        type: DECREMENT_TASK,
        taskId: taskId,
    };
};
