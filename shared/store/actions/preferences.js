export const APPLY_PREFERENCES = "APPLY_PREFERENCES";
export const SET_HAS_LOADED = "SET_HAS_LOADED";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const CLOUD_OPT_OUT = "CLOUD_OPT_OUT";

import * as db from "../../helpers/db";
import { SET_USER } from "./auth";

export const loadPreferences = () => {
    return async (dispatch) => {
        const dbResult = await db.fetchOptions();
        const parsedResults = await dbResult.rows["_array"];
        const options = {};

        for (const option of parsedResults) {
            options[option.name] = {
                name: option.name,
                value: option.value,
                key: option.id,
                fullName: option.fullName,
                desc: option.desc,
            };
        }

        dispatch({
            type: APPLY_PREFERENCES,
            options: options,
        });

        dispatch({ type: SET_HAS_LOADED });
    };
};

export const savePreferences = (options) => {
    return async (dispatch) => {
        const parsedOptions = {};
        for (const option of options) {
            await db.updateOption(option.name, option.value.value);
            parsedOptions[option.name] = {
                name: option.name,
                value: option.value.value,
                key: option.value.id,
                fullName: option.value.fullName,
                desc: option.value.desc,
            };
        }
        dispatch({
            type: APPLY_PREFERENCES,
            options: parsedOptions,
        });
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

export const setIsLoading = () => {
    return {
        type: SET_IS_LOADING,
    };
};
