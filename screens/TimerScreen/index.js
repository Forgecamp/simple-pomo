import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, Button } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import ExpoConstants from "expo-constants";
import * as ColorConstants from "../../shared/constants/Colors";

const TimerScreen = () => {
    const [startingTime, setStartingTime] = useState(900);
    const [startingDuration, setStartingDuration] = useState(900);
    const [key, setKey] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    return (
        <View style={styles.main}>
            <View style={styles.clock}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={isRunning}
                    duration={startingDuration}
                    initialRemainingTime={startingTime}
                    colors={[[ColorConstants.Success, 1.0]]}
                    size={250}
                >
                    {({ remainingTime, animatedColor }) => {
                        let minutes = Math.floor(remainingTime / 60).toString();
                        let seconds = (remainingTime % 60)
                            .toString()
                            .padStart(2, "0");
                        return (
                            <Animated.Text
                                style={{
                                    color: animatedColor,
                                    ...styles.interiorText,
                                }}
                            >
                                {minutes} : {seconds}
                            </Animated.Text>
                        );
                    }}
                </CountdownCircleTimer>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: ExpoConstants.statusBarHeight + 20,
        backgroundColor: "#ecf0f1",
        // padding: 8,
    },
    interiorText: {
        fontSize: 24,
    },
});

export default TimerScreen;
