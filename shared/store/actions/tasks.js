export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const INCREMENT_TASK = "INCREMENT_TASK";
export const DECREMENT_TASK = "DECREMENT_TASK";
export const LOAD_TASKS = "LOAD_TASKS";
export const SET_TASKS = "SET_TASKS";

import Chance from "chance";
import * as db from "../../helpers/db";
import { firebase } from "../../helpers/firebase";

const chance = new Chance();

const generateId = (tasks) => {
    const guid = chance.guid();
    if (tasks.some((ele) => ele.id === guid)) {
        generateId();
    } else {
        return guid;
    }
};

export const addTask = (title) => {
    return async (dispatch) => {
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            const res = await db.addTask(title, 0);

            dispatch({
                type: ADD_TASK,
                taskData: {
                    id: res.insertId,
                    title: title,
                },
            });
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            const id = generateId(tasks);

            await firestore
                .collection("users")
                .doc(uid)
                .update({
                    tasks: firebase.firestore.FieldValue.arrayUnion({
                        id: id,
                        title: title,
                        count: 0,
                    }),
                });
            dispatch({
                type: ADD_TASK,
                taskData: {
                    id: id,
                    title: title,
                },
            });
        }
    };
};

export const removeTask = (taskId) => {
    return async (dispatch) => {
        await db.removeTask(taskId);
        dispatch({
            type: REMOVE_TASK,
            taskId: taskId,
        });
    };
};

export const completeTask = (isBreak, taskId, currentCount) => {
    return async (dispatch) => {
        currentCount > 0
            ? db.decrementTask(taskId, currentCount)
            : db.removeTask(taskId, currentCount);
        dispatch({
            type: COMPLETE_TASK,
            isBreak: isBreak,
            currentCount: currentCount,
        });
    };
};

export const updateTask = (taskId, newTitle) => {
    return async (dispatch) => {
        db.updateTask(taskId, newTitle);
        dispatch({
            type: EDIT_TASK,
            taskData: {
                taskId: taskId,
                newTitle: newTitle,
            },
        });
    };
};

export const incrementTask = (taskId, currentCount) => {
    return async (dispatch) => {
        db.incrementTask(taskId, currentCount);
        dispatch({
            type: INCREMENT_TASK,
            taskId: taskId,
        });
    };
};

export const decrementTask = (taskId, currentCount) => {
    return async (dispatch) => {
        db.decrementTask(taskId, currentCount);
        dispatch({
            type: DECREMENT_TASK,
            taskId: taskId,
        });
    };
};

export const loadTasks = () => {
    return async (dispatch) => {
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            try {
                const dbResult = await db.fetchTasks();
                dispatch({ type: SET_TASKS, tasks: [...dbResult.rows._array] });
            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            dispatch({ type: SET_TASKS, tasks: tasks });
        }
    };
};
