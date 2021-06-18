export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (user) => {
    return { type: AUTHENTICATE, uid: user ? user.uid : null };
};

export const logout = () => {
    return { type: LOGOUT };
};
