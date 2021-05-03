import {
    ADD_TASK,
    COMPLETE_TASK,
    EDIT_TASK,
    REMOVE_TASK,
    INCREMENT_TASK,
    DECREMENT_TASK,
} from "../actions/tasks";
import Task from "../../models/task";

const initialState = { tasks: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = new Task(action.taskData.title);
            return { ...state, tasks: state.tasks.concat(newTask) };
        }
        case COMPLETE_TASK: {
            if (state.tasks.length === 0) return state;
            const updatedTasks = [...state.tasks];
            if (updatedTasks[0].count > 0) {
                updatedTasks[0].count = updatedTasks[0].count - 1;
            } else {
                updatedTasks.pop();
            }
            return { ...state, tasks: updatedTasks };
        }
        default: {
            return state;
        }
    }
}
