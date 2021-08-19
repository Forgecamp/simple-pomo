/* eslint-disable react/prop-types */
// Core
import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ControlBar = (props) => {
    return (
        // Handles the Control Bar.
        // Each button is hooked up to an appropriate action from the root module
        <View style={styles.controlBar}>
            <TouchableOpacity onPress={() => props.playPauseHandler(false)}>
                <Ionicons
                    name={
                        Platform.OS === "android"
                            ? props.isRunning
                                ? "md-pause"
                                : "md-play"
                            : props.isRunning
                            ? "ios-pause"
                            : "ios-play"
                    }
                    size={48}
                    color={props.color}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.stopHandler}>
                <Ionicons
                    name={Platform.OS === "android" ? "md-stop" : "ios-stop"}
                    size={48}
                    color={props.color}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    controlBar: {
        flexDirection: "row",
        paddingTop: 25,
        alignItems: "center",
        justifyContent: "space-evenly",
        width: 200,
    },
});

export default ControlBar;
