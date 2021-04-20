export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = () => {
    return { type: AUTHENTICATE };
};

export const logout = () => {
    return { type: LOGOUT };
};
