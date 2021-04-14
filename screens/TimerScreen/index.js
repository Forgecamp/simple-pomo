// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Animated, Platform, Text } from "react-native";
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
                                <Animated.Text
                                    style={{
                                        color: animatedColor,
                                        ...styles.interiorText,
                                    }}
                                >
                                    {minutes} : {seconds}
                                </Animated.Text>
                                <Ionicons
                                    name="md-reload"
                                    size={24}
                                    color={ColorConstants.Notice}
                                    style={{ paddingTop: 15 }}
                                />
                            </View>
                        );
                    }}
                </CountdownCircleTimer>
            </View>
            <View style={styles.controlBar}>
                <Ionicons
                    name="md-play"
                    size={48}
                    color={ColorConstants.Notice}
                />
                <Ionicons
                    name="md-stop"
                    size={48}
                    color={ColorConstants.Notice}
                />
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
