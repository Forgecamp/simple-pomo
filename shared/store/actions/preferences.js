export const APPLY_PREFERENCES = "APPLY_PREFERENCES";
export const SET_HAS_LOADED = "SET_HAS_LOADED";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const CLOUD_OPT_OUT = "CLOUD_OPT_OUT";
export const CLOUD_OPT_IN = "CLOUD_OPT_IN";

import * as db from "../../helpers/db";
import { firebase } from "../../helpers/firebase";

export const loadPreferences = () => {
    return async (dispatch) => {
        try {
            const uid = await firebase.auth().currentUser?.uid;
            const dbResult = await db.fetchOptions();
            const parsedResults = await dbResult.rows["_array"];
            let options = {};

            for (const option of parsedResults) {
                options[option.name] = {
                    name: option.name,
                    value: option.value,
                    key: option.id,
                    fullName: option.fullName,
                    desc: option.desc,
                };
            }
            if (uid !== undefined) {
                const firestore = firebase.firestore();
                const record = await firestore
                    .collection("users")
                    .doc(uid)
                    .get();
                let cloudOptions = await record.data().options;
                if (Object.keys(cloudOptions).length === 0) {
                    await firestore
                        .collection("users")
                        .doc(uid)
                        .update({ options: options });
                } else {
                    options = { ...cloudOptions };
                }
            }
            dispatch({
                type: APPLY_PREFERENCES,
                options: options,
            });

            dispatch({ type: SET_HAS_LOADED });
        } catch (error) {
            console.log(error);
        }
    };
};

export const savePreferences = (options) => {
    return async (dispatch) => {
        try {
            const uid = await firebase.auth().currentUser?.uid;
            const firestore = firebase.firestore();

            if (uid === undefined) {
                for (const key of Object.keys(options)) {
                    await db.updateOption(
                        options[key].name,
                        options[key].value
                    );
                }
            } else {
                await firestore
                    .collection("users")
                    .doc(uid)
                    .update({ options: options });
            }

            dispatch({
                type: APPLY_PREFERENCES,
                options: options,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const cloudOptOut = () => {
    return async (dispatch) => {
        await db.updateOption("cloudStorage", 0);
        dispatch({
            type: CLOUD_OPT_OUT,
        });
    };
};

export const cloudOptIn = () => {
    return async (dispatch) => {
        await db.updateOption("cloudStorage", 1);
        dispatch({
            type: CLOUD_OPT_IN,
        });
    };
};

export const setIsLoading = () => {
    return {
        type: SET_IS_LOADING,
    };
};
