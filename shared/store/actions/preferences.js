export const APPLY_PREFERENCES = "APPLY_PREFERENCES";
export const SET_HAS_LOADED = "SET_HAS_LOADED";

import { RESET } from "./timer";

import * as db from "../../helpers/db";

export const loadPreferences = () => {
    return async (dispatch) => {
        const dbResult = await db.fetchOptions();
        const parsedResults = await dbResult.rows["_array"];
        const options = {};

        for (const option of parsedResults) {
            options[option.name] = option.value;
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
            await db.updateOption(option.name, option.value);
            parsedOptions[option.name] = option.value;
        }

        dispatch({
            type: APPLY_PREFERENCES,
            options: parsedOptions,
        });
        dispatch({
            type: RESET,
        });
    };
};
