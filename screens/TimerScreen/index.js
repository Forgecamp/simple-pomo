// Core/First Party
import React, { useCallback, useEffect, useRef } from "react";
import { View, StyleSheet, Alert, AppState } from "react-native";
import * as Notifications from "expo-notifications";
// Third Party Packages
import { useDispatch, useSelector } from "react-redux";
// Additional Modules/Components
import Timer from "./timer";
import ControlBar from "./controlBar";
import MenuButton from "../../shared/components/UI/MenuButton";
import * as taskActions from "../../shared/store/actions/tasks";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";
import * as Permissions from "expo-permissions";

const TimerScreen = (props) => {
    const dispatch = useDispatch();
    const stateSlice = useSelector((state) => state.tasks);
    const appState = useRef(AppState.currentState);

    const endTime = stateSlice.endTime;
    const timerRunning = stateSlice.isRunning;

    // Notifications.setNotificationHandler({
    //     handleNotification: async () => {
    //         console.log("yo");
    //         timerEndHandler();
    //         return { shouldShowAlert: true };
    //     },
    // });

    // useEffect(() => {
    //     AppState.addEventListener("change", () => {
    //         timerEndHandler();
    //     });

    //     return () => {
    //         AppState.removeEventListener("change", () => {
    //             timerEndHandler();
    //         });
    //     };
    // }, [endTime, timerRunning, stopHandler, timerEndHandler]);

    // const timerEndHandler = useCallback(() => {
    //     if (endTime === null) return;
    //     if (timerRunning && endTime <= new Date().getTime()) stopHandler(true);
    // }, [endTime, timerRunning, stopHandler]);

    const resetTimerHandler = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        dispatch(taskActions.reset());
    };

    const stopHandler = (skipAlert = false) => {
        if (skipAlert) {
            dispatch(taskActions.stop());
            return;
        }

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(taskActions.stop());
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const playPauseHandler = async () => {
        let notificationPermission = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        if (notificationPermission.status !== "granted")
            notificationPermission = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
        const currTime = new Date().getTime();
        const offset =
            (stateSlice.isBreak
                ? stateSlice.breakLength
                : stateSlice.focusLength) -
            stateSlice.timeElapsed / 1000;
        if (stateSlice.isRunning) {
            await Notifications.cancelAllScheduledNotificationsAsync();
            dispatch(taskActions.playPauseToggle());
        } else {
            // const noteId = await Notifications.scheduleNotificationAsync({
            //     content: {
            //         title: "Time's Up!",
            //         body: "Time's Up!",
            //     },
            //     trigger: currTime + offset * 1000,
            // });
            dispatch(taskActions.playPauseToggle(1, currTime + offset * 1000));
        }
    };

    return (
        <View style={styles.main}>
            <Timer
                timerLength={
                    stateSlice.isBreak
                        ? stateSlice.breakLength
                        : stateSlice.focusLength
                }
                timerKey={stateSlice.key}
                resetTimerHandler={resetTimerHandler}
                playPauseHandler={playPauseHandler}
                isRunning={stateSlice.isRunning}
                color={
                    stateSlice.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
                title={stateSlice.isBreak ? "Break" : "Focus"}
                onComplete={() => {
                    stopHandler(true);
                }}
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={() => stopHandler()}
                isRunning={stateSlice.isRunning}
                color={
                    stateSlice.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
            />
        </View>
    );
};

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "Simple Pomo",
        headerLeft: () => MenuButton(navData),
    };
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 3 * ExpoConstants.statusBarHeight,
        backgroundColor: "#ecf0f1",
    },
});

export default TimerScreen;
