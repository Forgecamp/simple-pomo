// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Third Party Packages
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorConstants from "../../shared/constants/Colors";

const TimerScreen = () => {
    const [startingTime, setStartingTime] = useState(900);
    const [startingDuration, setStartingDuration] = useState(900);
    const [key, setKey] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const resetTimerHandler = () => {
        setIsRunning(() => false);
        setKey((prevKey) => prevKey + 1);
    };

    const playPauseHandler = () => {
        setIsRunning((prevStatus) => !prevStatus);
    };

    const stopHandler = () => {
        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        console.log("stop");
                        setIsRunning(() => false);
                        setKey((prevKey) => prevKey + 1);
                    },
                },
                {
                    text: "No",
                    onPress: () => {
                        console.log("continue");
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.main}>
            <View style={styles.timerFace}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={isRunning}
                    duration={startingDuration}
                    initialRemainingTime={startingTime}
                    colors={[[ColorConstants.Notice, 1.0]]}
                    size={250}
                >
                    {({ remainingTime, animatedColor }) => {
                        let minutes = Math.floor(remainingTime / 60)
                            .toString()
                            .padStart(2, "0");
                        let seconds = (remainingTime % 60)
                            .toString()
                            .padStart(2, "0");
                        return (
                            <View style={styles.timerInterior}>
                                <Animated.Text
                                    style={{
                                        color: animatedColor,
                                        ...styles.interiorTask,
                                    }}
                                >
                                    Placeholder Text
                                </Animated.Text>
                                <TouchableOpacity onPress={playPauseHandler}>
                                    <Animated.Text
                                        style={{
                                            color: animatedColor,
                                            ...styles.interiorCounter,
                                        }}
                                    >
                                        {minutes} : {seconds}
                                    </Animated.Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={resetTimerHandler}>
                                    <Ionicons
                                        name={
                                            Platform.OS === "android"
                                                ? "md-reload"
                                                : "ios-reload"
                                        }
                                        size={24}
                                        color={ColorConstants.Notice}
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </CountdownCircleTimer>
            </View>
            <View style={styles.controlBar}>
                <TouchableOpacity onPress={playPauseHandler}>
                    <Ionicons
                        name={
                            Platform.OS === "android"
                                ? isRunning
                                    ? "md-pause"
                                    : "md-play"
                                : isRunning
                                ? "ios-pause"
                                : "ios-play"
                        }
                        size={48}
                        color={ColorConstants.Notice}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={stopHandler}>
                    <Ionicons
                        name={
                            Platform.OS === "android" ? "md-stop" : "ios-stop"
                        }
                        size={48}
                        color={ColorConstants.Notice}
                    />
                </TouchableOpacity>
            </View>
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
    interiorCounter: {
        padding: 5,
        fontSize: 24,
    },
    interiorTask: {
        fontSize: 18,
    },
    timerInterior: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        width: "100%",
        paddingTop: 12,
        height: "80%",
    },
    controlBar: {
        flexDirection: "row",
        paddingTop: 25,
        alignItems: "center",
        justifyContent: "space-evenly",
        width: 200,
    },
});

export default TimerScreen;
