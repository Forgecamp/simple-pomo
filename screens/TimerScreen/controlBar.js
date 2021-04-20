/* eslint-disable react/prop-types */
// Core/First Party
import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Third Party Packages
import * as ColorConstants from "../../shared/constants/Colors";

const ControlBar = (props) => {
    return (
        <View style={styles.controlBar}>
            <TouchableOpacity onPress={props.playPauseHandler}>
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
                    color={ColorConstants.Notice}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.stopHandler}>
                <Ionicons
                    name={Platform.OS === "android" ? "md-stop" : "ios-stop"}
                    size={48}
                    color={ColorConstants.Notice}
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
