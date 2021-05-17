export const SET_FOCUS = "SET_FOCUS";
export const SET_SHORT_BREAK = "SET_SHORT_BREAK";
export const SET_LONG_BREAK = "SET_LONG_BREAK";
export const TOGGLE_AUTO_CONTINE = "TOGGLE_AUTO_CONTINUE";
export const TOGGLE_SOUND = "TOGGLE_SOUND";
export const TOGGLE_CLOUD = "TOGGLE_CLOUD";

export const setFocus = (length) => {
    return {
        type: SET_FOCUS,
        length: length,
    };
};

export const setShortBreak = (length) => {
    return {
        type: SET_SHORT_BREAK,
        length: length,
    };
};

export const setLongBreak = (length) => {
    return {
        type: SET_LONG_BREAK,
        length: length,
    };
};

export const toggleAutoContinue = () => {
    return {
        type: TOGGLE_AUTO_CONTINE,
    };
};

export const toggleSound = () => {
    return {
        type: TOGGLE_SOUND,
    };
};

export const toggleCloud = () => {
    return {
        type: TOGGLE_CLOUD,
    };
};
