export const APPLY_PREFERENCES = "APPLY_PREFERENCES";
export const SET_HAS_LOADED = "SET_HAS_LOADED";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const CLOUD_OPT_OUT = "CLOUD_OPT_OUT";
export const CLOUD_OPT_IN = "CLOUD_OPT_IN";

import * as db from "../../helpers/db";
import { firebase } from "../../helpers/firebase";

export const loadPreferences = () => {
    // Grab the user's preferences from Firestore if logged in or internal DB if not
    return async (dispatch) => {
        try {
            // Even if the user is logged in we may need the default options from the internal DB
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
                // If there's a UID then they're logged in, so check Firestore
                const firestore = firebase.firestore();
                const record = await firestore
                    .collection("users")
                    .doc(uid)
                    .get();
                let cloudOptions = await record.data().options;
                if (Object.keys(cloudOptions).length === 0) {
                    // If the Firestore is empty, send up the default options
                    await firestore
                        .collection("users")
                        .doc(uid)
                        .update({ options: options });
                } else {
                    // If not, use the Firestore options
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
    // Save the current options to the internal DB or Firestore, as appropriate
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
