import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import ExpoConstants from "expo-constants";

const TimerScreen = () => {
    return (
        <View style={styles.main}>
            <View style={styles.clock}>
                {/* <Text>Yo</Text> */}
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    initialRemainingTime={9}
                    colors={[
                        ["#004777", 0.4],
                        ["#F7B801", 0.4],
                        ["#A30000", 0.2],
                    ]}
                >
                    {({ remainingTime, animatedColor }) => {
                        if (remainingTime === 0) console.log("yo");
                        return (
                            <Animated.Text style={{ color: animatedColor }}>
                                {remainingTime}
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
        paddingBottom: ExpoConstants.statusBarHeight,
        backgroundColor: "#ecf0f1",
        padding: 8,
    },
});

export default TimerScreen;
