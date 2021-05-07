import {
    ADD_TASK,
    COMPLETE_TASK,
    EDIT_TASK,
    REMOVE_TASK,
    INCREMENT_TASK,
    DECREMENT_TASK,
} from "../actions/tasks";
import Task from "../../models/task";
import dummyData from "../../dummyData";
const initialState = { tasks: [...dummyData] };

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            const newTask = new Task(
                new Date().getTime(),
                action.taskData.title
            );
            return { ...state, tasks: state.tasks.concat(newTask) };
        }
        case COMPLETE_TASK: {
            if (state.tasks.length === 0) return state;
            if (action.isBreak) return state;
            let updatedTasks = [...state.tasks];
            if (updatedTasks[0].count > 0) {
                updatedTasks[0].count = updatedTasks[0].count - 1;
            } else {
                updatedTasks = updatedTasks.slice(1);
            }
            return { ...state, tasks: updatedTasks };
        }
        case EDIT_TASK: {
            const updatedTasks = [...state.tasks];
            const relevantIndex = updatedTasks.findIndex(
                (task) => task.id === action.taskData.taskId
            );
            if (relevantIndex === -1) return state;
            updatedTasks[relevantIndex].title = action.taskData.newTitle;
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case REMOVE_TASK: {
            let updatedTasks = [...state.tasks];
            updatedTasks = updatedTasks.filter(
                (task) => task.id !== action.taskId
            );
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case DECREMENT_TASK: {
            const updatedTasks = [...state.tasks];
            const relevantIndex = updatedTasks.findIndex(
                (task) => task.id === action.taskId
            );
            if (relevantIndex === -1) return state;
            updatedTasks[relevantIndex].count =
                updatedTasks[relevantIndex].count - 1;
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case INCREMENT_TASK: {
            const updatedTasks = [...state.tasks];
            const relevantIndex = updatedTasks.findIndex(
                (task) => task.id === action.taskId
            );
            if (relevantIndex === -1) return state;
            updatedTasks[relevantIndex].count =
                updatedTasks[relevantIndex].count + 1;
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        default: {
            return state;
        }
    }
}
