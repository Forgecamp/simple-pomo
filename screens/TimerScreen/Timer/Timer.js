/* eslint-disable react/prop-types */
// Core
import React from "react";
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
// Third Party
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Timer = (props) => {
    // Most of this is just setting up the CountdownCircleTimer
    const timerState = useSelector((state) => state.timer);
    return (
        <View style={styles.timerFace}>
            <CountdownCircleTimer
                key={timerState.key}
                isPlaying={timerState.isRunning}
                duration={
                    timerState.isBreak
                        ? timerState.breakLength
                        : timerState.focusLength
                }
                colors={[[props.color, 1.0]]}
                size={250}
                onComplete={props.onComplete}
            >
                {/* Handles the inside of the timer */}
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
                                {props.title}
                            </Animated.Text>
                            {/* Clicking the remaining time should also pause/play */}
                            <TouchableOpacity
                                onPress={() => props.playPauseHandler(false)}
                            >
                                <Animated.Text
                                    style={{
                                        color: animatedColor,
                                        ...styles.interiorCounter,
                                    }}
                                >
                                    {minutes} : {seconds}
                                </Animated.Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={props.resetTimerHandler}>
                                <Ionicons
                                    name={
                                        Platform.OS === "android"
                                            ? "md-reload"
                                            : "ios-reload"
                                    }
                                    size={24}
                                    color={props.color}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </CountdownCircleTimer>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default Timer;
