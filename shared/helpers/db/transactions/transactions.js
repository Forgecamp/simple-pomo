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
            "In minutes:"
        );
        
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "defaultShortBreak",
            300,
            "Short Break Length",
            "In minutes:"
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "defaultLongBreak",
            900,
            "Long Break Length",
            "In minutes:"
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "autoContinue",
            0,
            "Begin Breaks Automatically",
            "Start breaks without prompting:"
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "useSound",
            1,
            "Sound",
            "Play a sound when periods end:"
        );
    `,
    `
        INSERT INTO options (name, value, fullName, desc) 
        VALUES (
            "cloudStorage",
            0,
            "Cloud Sync",
            "Store tasks on the cloud:"
        );
    `,
];
