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
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL UNIQUE,
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
        db.transaction((tx) => {
            tx.executeSql(
                `   
                    INSERT INTO options (name, value) VALUES ("defaultShortBreak", 300);
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
                    INSERT INTO options (name, value) VALUES ("defaultFocus", 1500);
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
                    INSERT INTO options (name, value) VALUES ("defaultLongBreak", 900);
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
                    INSERT INTO options (name, value) VALUES ("focusLength", 1500);
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
                    INSERT INTO options (name, value) VALUES ("shortBreakLength", 300);
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
                    INSERT INTO options (name, value) VALUES ("longBreakLength", 900);
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
                    INSERT INTO options (name, value) VALUES ("autoContinue", 0);
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
                    INSERT INTO options (name, value) VALUES ("cloudStorage", 0);
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
                    INSERT INTO options (name, value) VALUES ("useSound", 1);
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
