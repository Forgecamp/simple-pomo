import { firebase } from "../../helpers/firebase";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_USER_LOADED = "SET_USER_LOADED";
export const SET_USER = "SET_USER";

export const authenticate = (credential) => {
    return async (dispatch) => {
        dispatch(setUserLoading());
        try {
            const res = await firebase.auth().signInWithCredential(credential);
            const user = res.user;
            const firestore = firebase.firestore();
            const record = await firestore
                .collection("users")
                .doc(user.uid)
                .get();
            if (record.exists) {
                const data = record.data();
            } else {
                firestore.collection("users").doc(user.uid).set({
                    email: user.email,
                    id: user.uid,
                    tasks: [],
                    options: {},
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const setUser = (user) => {
    return { type: SET_USER, uid: user ? user.uid : null };
};

export const logout = () => {
    return { type: LOGOUT };
};

export const setUserLoading = () => {
    return { type: SET_USER_LOADING };
};

export const setUserLoaded = () => {
    return { type: SET_USER_LOADED };
};
