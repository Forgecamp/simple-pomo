// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
// Third Party Packages
// Additional Modules/Components
import Timer from "./timer";
import ControlBar from "./controlBar";
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants
import ExpoConstants from "expo-constants";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const TimerScreen = () => {
    const [focusLength, setFocusLength] = useState(1500);
    const [shortBreakLength, setShortBreakLength] = useState(300);
    const [longBreakLength, setLongBreakLength] = useState(900);
    const [breakLength, setBreakLength] = useState(300);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [completedBreaks, setCompletedBreaks] = useState(0);
    const [notificationId, setNotificationId] = useState(null);
    const [isBreak, setIsBreak] = useState(false);
    const [key, setKey] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const resetTimerHandler = () => {
        setIsRunning(() => false);
        setKey((prevKey) => prevKey + 1);
        setTimeElapsed(() => 0);
    };

    const playPauseHandler = async () => {
        const currTime = new Date().getTime();
        if (isRunning) {
            setIsRunning((prev) => !prev);
            setTimeElapsed((prev) => prev + currTime - startTime);
            await Notifications.cancelScheduledNotificationAsync(
                notificationId
            );
        } else {
            setStartTime(() => currTime);
            const noteId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Time's Up!",
                    body: "Time's Up!",
                },
                trigger:
                    currTime + isBreak
                        ? breakLength
                        : focusLength - timeElapsed,
            });
            setNotificationId(() => noteId);
            setIsRunning((prev) => !prev);
        }
    };

    const stopHandler = () => {
        const stopTimer = () => {
            setIsRunning(() => false);
            if (isBreak) {
                let breaks = completedBreaks;
                if (breaks >= 2) {
                    setBreakLength(longBreakLength);
                } else {
                    setBreakLength(shortBreakLength);
                }
                if (breaks >= 2) breaks = -2;
                setCompletedBreaks(() => breaks + 1);
            }
            setIsBreak((prevStatus) => !prevStatus);
            setKey((prevKey) => prevKey + 1);
            setTimeElapsed(() => 0);
        };

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: stopTimer,
                },
                {
                    text: "No",
                    onPress: null,
                },
            ]
        );
    };

    return (
        <View style={styles.main}>
            <Timer
                timerLength={isBreak ? breakLength : focusLength}
                timerKey={key}
                resetTimerHandler={resetTimerHandler}
                playPauseHandler={playPauseHandler}
                isRunning={isRunning}
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={stopHandler}
                isRunning={isRunning}
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
