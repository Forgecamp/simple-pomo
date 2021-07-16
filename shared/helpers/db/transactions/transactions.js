export const init = [
    `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT NOT NULL, 
            count INTEGER NOT NULL
        );

    `,
    `
        CREATE TABLE IF NOT EXISTS options (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            value INTEGER NOT NULL,
            fullName TEXT NOT NULL,
            desc TEXT NOT NULL
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "defaultFocus",
            1500,
            "Focus Period Length",
            "The length of each period of activity, in minutes."
        );
        
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "defaultShortBreak",
            300,
            "Short Break Length",
            "The duration of breaks after the 1st, 2nd, and 3rd focus periods, in minutes."
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "defaultLongBreak",
            900,
            "Long Break Length",
            "The length of every fourth break, which should be longer than the short breaks."
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "autoContinue",
            0,
            "Begin Breaks Automatically",
            "Breaks begin immediately after focus periods, without user input."
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "useSound",
            1,
            "Sound",
            "Enable sound while Simple Pomo is active in the foreground."
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "cloudStorage",
            1,
            "Cloud Sync",
            "Store your tasks and settings in the cloud."
        );
    `,
];
