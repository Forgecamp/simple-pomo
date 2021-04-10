import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerScreen = () => {
    return (
        <View style={styles.main}>
            <Text>Main Timer Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
});

export default TimerScreen;
