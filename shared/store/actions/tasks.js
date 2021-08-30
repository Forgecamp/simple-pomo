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

import { v4 as uuidv4 } from "uuid";
import * as db from "../../helpers/db";
import { firebase } from "../../helpers/firebase";

export const addTask = (title) => {
    return async (dispatch) => {
        try {
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                // If there's no UID we're not logged in; save it to the DB
                // The internal DB generates a safe ID by itself, so we can use that
                const res = await db.addTask(title, 0);
                dispatch({
                    type: ADD_TASK,
                    taskData: {
                        id: res.insertId,
                        title: title,
                    },
                });
            } else {
                // If we have a UID we're logged in; send it to Firestore
                const firestore = firebase.firestore();
                const id = uuidv4();
                dispatch({
                    type: ADD_TASK,
                    taskData: {
                        id: id,
                        title: title,
                    },
                });
                firestore
                    .collection("users")
                    .doc(uid)
                    .update({
                        lastUpdated: Date.now(),
                        tasks: firebase.firestore.FieldValue.arrayUnion({
                            id: id,
                            title: title,
                            count: 0,
                        }),
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const removeTask = (taskId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REMOVE_TASK,
                taskId: taskId,
            });
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                // Removing a task if we're not logged in is straightforward
                await db.removeTask(taskId);
            } else {
                // .. removing a task from Firestore a bit less so, since we need the index
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data()?.tasks;
                const relevantIndex = tasks.findIndex(
                    (task) => task.id === taskId
                );

                firestore
                    .collection("users")
                    .doc(uid)
                    .update({
                        lastUpdated: Date.now(),
                        tasks: firebase.firestore.FieldValue.arrayRemove(
                            tasks[relevantIndex]
                        ),
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const completeTask = (isBreak, taskId, currentCount) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: COMPLETE_TASK,
                isBreak: isBreak,
                currentCount: currentCount,
            });
            // We need to make sure we're not trying to complete a non-existant task
            // I.E. a break, or if someone is using it with the default 'Focus' task
            if (!isBreak && taskId.length) {
                const uid = await firebase.auth().currentUser?.uid;
                if (uid === undefined) {
                    // Decrement the task by one or remove it if there's only one left
                    // .. straightforward with the internal DB
                    currentCount > 0
                        ? db.decrementTask(taskId, currentCount)
                        : db.removeTask(taskId, currentCount);
                } else {
                    // .. a little less so with Firestore
                    // Same principle, however
                    const firestore = firebase.firestore();
                    const doc = await firestore
                        .collection("users")
                        .doc(uid)
                        .get();
                    const tasks = doc.data()?.tasks;
                    const relevantIndex = tasks.findIndex(
                        (task) => task.id === taskId
                    );
                    // Decrement or remove the task, based on the count
                    if (currentCount > 0) {
                        tasks[relevantIndex].count--;
                        firestore.collection("users").doc(uid).update({
                            lastUpdated: Date.now(),
                            tasks: tasks,
                        });
                    } else {
                        firestore
                            .collection("users")
                            .doc(uid)
                            .update({
                                lastUpdated: Date.now(),
                                tasks: firebase.firestore.FieldValue.arrayRemove(
                                    tasks[relevantIndex]
                                ),
                            });
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateTask = (taskId, newTitle) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: EDIT_TASK,
                taskData: {
                    taskId: taskId,
                    newTitle: newTitle,
                },
            });
            // Updating the title is always pretty straightforward
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                db.updateTask(taskId, newTitle);
            } else {
                // Editing the title of the task and replacing the old task list with the new:
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data()?.tasks;
                const relevantIndex = tasks.findIndex(
                    (task) => task.id === taskId
                );

                tasks[relevantIndex].title = newTitle;
                firestore.collection("users").doc(uid).update({
                    lastUpdated: Date.now(),
                    tasks: tasks,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const incrementTask = (taskId, currentCount) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: INCREMENT_TASK,
                taskId: taskId,
            });
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                db.incrementTask(taskId, currentCount);
            } else {
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data()?.tasks;
                const relevantIndex = tasks.findIndex(
                    (task) => task.id === taskId
                );

                tasks[relevantIndex].count++;
                firestore.collection("users").doc(uid).update({
                    lastUpdated: Date.now(),
                    tasks: tasks,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const decrementTask = (taskId, currentCount) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DECREMENT_TASK,
                taskId: taskId,
            });
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                db.decrementTask(taskId, currentCount);
            } else {
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data()?.tasks;
                const relevantIndex = tasks.findIndex(
                    (task) => task.id === taskId
                );

                tasks[relevantIndex].count--;
                firestore.collection("users").doc(uid).update({
                    lastUpdated: Date.now(),
                    tasks: tasks,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadTasks = () => {
    return async (dispatch) => {
        // Loading tasks is also straightforward
        // Just grabbing an array from a DB in either case and dispatching it
        try {
            const uid = await firebase.auth().currentUser?.uid;
            if (uid === undefined) {
                try {
                    const dbResult = await db.fetchTasks();
                    dispatch({
                        type: SET_TASKS,
                        tasks: [...dbResult.rows._array],
                    });
                    dispatch(setTasksLoaded());
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            } else {
                const firestore = firebase.firestore();
                const doc = await firestore.collection("users").doc(uid).get();
                const tasks = doc.data()?.tasks;
                dispatch({ type: SET_TASKS, tasks: tasks });
                dispatch(setTasksLoaded());
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const setTasksLoading = () => {
    return { type: SET_TASKS_LOADING };
};

export const setTasksLoaded = () => {
    return { type: SET_TASKS_LOADED };
};
