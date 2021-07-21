import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as taskActions from "./tasks";

export const PLAY_PAUSE_TOGGLE = "PLAY_PAUSE_TOGGLE";
export const STOP = "STOP";
export const RESET = "RESET";

export const playPause = (endTime = null) => {
    return async (dispatch) => {
        let noteId = null;
        if (endTime) {
            // If an endTime is passed then we're starting the timer
            // Schedule a notification to go off at the prescribed time
            if (Platform.OS === "ios") {
                // We need to ensure we have sufficient permissions on IOS
                let permission = await Notifications.getPermissionsAsync();
                if (permission.status === "undetermined") {
                    permission = await Notifications.requestPermissionsAsync({
                        ios: { allowAlert: true, allowSound: true },
                    });
                }
            }
            noteId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Simple Pomo",
                    body: "Timer finished!",
                },
                trigger: endTime,
            });
        } else {
            // If there is no endTime specified then somebody hit pause
            // Cancel notifications so the user doesn't receive a notice for a paused timer
            await Notifications.cancelAllScheduledNotificationsAsync();
        }
        dispatch({
            type: PLAY_PAUSE_TOGGLE,
            noteId: noteId,
            endTime: endTime,
        });
    };
};

export const stop = (taskId, isBreak, currentCount) => {
    return async (dispatch) => {
        // When the user hits stop we stop all notifications
        await Notifications.cancelAllScheduledNotificationsAsync();
        dispatch({
            type: STOP,
        });
        // Send a completeTask dispatch with the information we have
        // Whether or not to complete a task is decided by the completeTask action
        dispatch(taskActions.completeTask(taskId, isBreak, currentCount));
    };
};
export const reset = () => {
    return async (dispatch) => {
        // Resets the current timer back to start, which will also pause it
        await Notifications.cancelAllScheduledNotificationsAsync();
        dispatch({
            type: RESET,
        });
    };
};
