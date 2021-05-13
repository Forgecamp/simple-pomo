/* eslint-disable no-unused-vars */
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("simplepomo.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT, 
                        title TEXT NOT NULL, 
                        count INTEGER NOT NULL
                    );

                `,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
        db.transaction((tx) => {
            tx.executeSql(
                `
                    CREATE TABLE IF NOT EXISTS options (
                        oid INTEGER PRIMARY KEY AUTOINCREMENT,
                        value INTEGER NOT NULL
                    );
                `,
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const addTask = (title, count) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    INSERT INTO tasks (title, count) 
                    VALUES (?, ?)
                `,
                [title, count],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchTasks = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    SELECT * FROM tasks
                `,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const removeTask = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    DELETE FROM tasks
                    WHERE id = ?;
                `,
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
