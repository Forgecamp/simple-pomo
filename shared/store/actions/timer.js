import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { COMPLETE_TASK } from "./tasks";

export const PLAY_PAUSE_TOGGLE = "PLAY_PAUSE_TOGGLE";
export const STOP = "STOP";
export const RESET = "RESET";

export const playPause = (endTime = null) => {
    return async (dispatch) => {
        let noteId = null;
        if (endTime) {
            if (Platform.OS === "ios") {
                let permission = await Notifications.getPermissionsAsync();
                if (permission.status === "undetermined") {
                    permission = await Notifications.requestPermissionsAsync({
                        ios: { allowAlert: true, allowSound: true },
                    });
                }
            }
            noteId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time's Up!",
                    body: "Time's Up!",
                },
                trigger: endTime,
            });
        } else {
            await Notifications.cancelAllScheduledNotificationsAsync();
        }
        dispatch({
            type: PLAY_PAUSE_TOGGLE,
            noteId: noteId,
            endTime: endTime,
        });
    };
};

export const stop = (isBreak) => {
    return async (dispatch) => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        dispatch({
            type: STOP,
        });
        dispatch({
            type: COMPLETE_TASK,
            isBreak: isBreak,
        });
    };
};
export const reset = () => {
    return async (dispatch) => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        dispatch({
            type: RESET,
        });
    };
};
