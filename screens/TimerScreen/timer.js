/* eslint-disable react/prop-types */
// Core/First Party
import React from "react";
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Third Party Packages
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
// Additional Modules/Components
// Constants
import * as ColorConstants from "../../shared/constants/Colors";

const Timer = (props) => {
    return (
        <View style={styles.timerFace}>
            <CountdownCircleTimer
                key={props.timerKey}
                isPlaying={props.isRunning}
                duration={props.timerLength}
                // initialRemainingTime={props.timerStart}
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
                            <TouchableOpacity onPress={props.playPauseHandler}>
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
                                    color={ColorConstants.Notice}
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