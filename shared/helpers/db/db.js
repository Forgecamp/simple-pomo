/* eslint-disable no-unused-vars */
// Core
import * as SQLite from "expo-sqlite";
// The initialization is long, for brevity it is in another file
import * as transactions from "./transactions";

const db = SQLite.openDatabase("simplepomo.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        for (const item of transactions.init) {
            db.transaction((tx) => {
                tx.executeSql(
                    item,
                    [],
                    () => {
                        resolve();
                    },
                    (_, err) => {
                        reject(err);
                    }
                );
            });
        }
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

export const incrementTask = (id, currentCount) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    UPDATE tasks
                    SET count = ?
                    WHERE id = ?;
                `,
                [currentCount + 1, id],
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

export const decrementTask = (id, currentCount) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    UPDATE tasks
                    SET count = ?
                    WHERE id = ?;
                `,
                [currentCount - 1, id],
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

export const updateTask = (id, newTitle) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    UPDATE tasks
                    SET title = ?
                    WHERE id = ?;
                `,
                [newTitle, id],
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

export const updateOption = (name, newValue) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    UPDATE options
                    SET value = ?
                    WHERE name = ?;
                `,
                [newValue, name],
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

export const fetchOptions = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `
                    SELECT * FROM options
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
