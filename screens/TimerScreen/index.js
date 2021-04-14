// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Additional Modules/Components
// Third Party Packages
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorConstants from "../../shared/constants/Colors";

const TimerScreen = () => {
    const [startingTime, setStartingTime] = useState(900);
    const [startingDuration, setStartingDuration] = useState(900);
    const [key, setKey] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

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
                                <Ionicons
                                    name="md-reload"
                                    size={24}
                                    color={ColorConstants.Notice}
                                    style={{ display: "none" }}
                                />
                                <TouchableOpacity onPress={playPauseHandler}>
                                    <Animated.Text
                                        style={{
                                            color: animatedColor,
                                            ...styles.interiorText,
                                        }}
                                    >
                                        {minutes} : {seconds}
                                    </Animated.Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={resetTimerHandler}>
                                    <Ionicons
                                        name="md-reload"
                                        size={24}
                                        color={ColorConstants.Notice}
                                        style={{ paddingTop: 15 }}
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
                        name={isRunning ? "md-pause" : "md-play"}
                        size={48}
                        color={ColorConstants.Notice}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={stopHandler}>
                    <Ionicons
                        name="md-stop"
                        size={48}
                        color={ColorConstants.Notice}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 2.5 * ExpoConstants.statusBarHeight,
        backgroundColor: "#ecf0f1",
    },
    interiorText: {
        fontSize: 24,
    },
    timerInterior: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        width: "100%",
        paddingTop: 42,
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
