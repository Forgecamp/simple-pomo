export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const COMPLETE_TASK = "COMPLETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const INCREMENT_TASK = "INCREMENT_TASK";
export const DECREMENT_TASK = "DECREMENT_TASK";
export const LOAD_TASKS = "LOAD_TASKS";
export const SET_TASKS = "SET_TASKS";
export const SET_TASKS_LOADING = "SET_TASKS_LOADING";
export const SET_TASKS_LOADED = "SET_TASKS_LOADED";

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
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            await db.removeTask(taskId);
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            const relevantIndex = tasks.findIndex((task) => task.id === taskId);

            await firestore
                .collection("users")
                .doc(uid)
                .update({
                    tasks: firebase.firestore.FieldValue.arrayRemove(
                        tasks[relevantIndex]
                    ),
                });
        }
        dispatch({
            type: REMOVE_TASK,
            taskId: taskId,
        });
    };
};

export const completeTask = (isBreak, taskId, currentCount) => {
    return async (dispatch) => {
        if (!isBreak && taskId.length) {
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                currentCount > 0
                    ? db.decrementTask(taskId, currentCount)
                    : db.removeTask(taskId, currentCount);
            } else {
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data().tasks;
                const relevantIndex = tasks.findIndex(
                    (task) => task.id === taskId
                );

                if (currentCount > 0) {
                    tasks[relevantIndex].count--;
                    await firestore.collection("users").doc(uid).update({
                        tasks: tasks,
                    });
                } else {
                    await firestore
                        .collection("users")
                        .doc(uid)
                        .update({
                            tasks: firebase.firestore.FieldValue.arrayRemove(
                                tasks[relevantIndex]
                            ),
                        });
                }
            }
        }
        dispatch({
            type: COMPLETE_TASK,
            isBreak: isBreak,
            currentCount: currentCount,
        });
    };
};

export const updateTask = (taskId, newTitle) => {
    return async (dispatch) => {
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            db.updateTask(taskId, newTitle);
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            const relevantIndex = tasks.findIndex((task) => task.id === taskId);

            tasks[relevantIndex].title = newTitle;
            await firestore.collection("users").doc(uid).update({
                tasks: tasks,
            });
        }
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
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            db.incrementTask(taskId, currentCount);
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            const relevantIndex = tasks.findIndex((task) => task.id === taskId);

            tasks[relevantIndex].count++;
            await firestore.collection("users").doc(uid).update({
                tasks: tasks,
            });
        }
        dispatch({
            type: INCREMENT_TASK,
            taskId: taskId,
        });
    };
};

export const decrementTask = (taskId, currentCount) => {
    return async (dispatch) => {
        const uid = await firebase.auth().currentUser?.uid;
        if (uid === undefined) {
            db.decrementTask(taskId, currentCount);
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            const relevantIndex = tasks.findIndex((task) => task.id === taskId);

            tasks[relevantIndex].count--;
            await firestore.collection("users").doc(uid).update({
                tasks: tasks,
            });
        }
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
                dispatch(setTasksLoaded());
            } catch (err) {
                console.log(err);
                throw err;
            }
        } else {
            const firestore = firebase.firestore();
            const doc = await firestore.collection("users").doc(uid).get();
            const tasks = doc.data().tasks;
            dispatch({ type: SET_TASKS, tasks: tasks });
            dispatch(setTasksLoaded());
        }
    };
};

export const setTasksLoading = () => {
    return { type: SET_TASKS_LOADING };
};

export const setTasksLoaded = () => {
    return { type: SET_TASKS_LOADED };
};
