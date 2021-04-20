// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
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

const TimerScreen = (props) => {
    const [focusLength, setFocusLength] = useState(20);
    const [shortBreakLength, setShortBreakLength] = useState(10);
    const [longBreakLength, setLongBreakLength] = useState(15);
    const [breakLength, setBreakLength] = useState(10);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [completedBreaks, setCompletedBreaks] = useState(0);
    const [notificationId, setNotificationId] = useState(null);
    const [isBreak, setIsBreak] = useState(false);
    const [key, setKey] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const dispatch = useDispatch();
    const stateSlice = useSelector((state) => state.tasks);

    const resetTimerHandler = () => {
        setIsRunning(() => false);
        setKey((prevKey) => prevKey + 1);
        setTimeElapsed(() => 0);
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
        const currTime = new Date().getTime();
        if (stateSlice.isRunning) {
            await Notifications.cancelAllScheduledNotificationsAsync();
            dispatch(taskActions.playPauseToggle());
        } else {
            const offset =
                (stateSlice.isBreak
                    ? stateSlice.breakLength
                    : stateSlice.focusLength) -
                stateSlice.timeElapsed / 1000;
            const noteId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time's Up!",
                    body: "Time's Up!",
                },
                trigger: currTime + offset * 1000,
            });
            dispatch(taskActions.playPauseToggle(noteId));
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
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={() => stopHandler()}
                isRunning={stateSlice.isRunning}
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
