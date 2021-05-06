import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./TaskList";

const TaskModal = (props) => {
    return (
        <View style={styles.modal}>
            <View style={styles.closeButton}>
                <TouchableOpacity onPress={props.modalHandler}>
                    <Ionicons
                        name={
                            Platform.OS === "android" ? "md-close" : "ios-close"
                        }
                        size={36}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.taskView}>
                <TaskList tasks={props.tasks} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        right: 2,
        top: 2,
    },
    modal: {
        height: "100%",
        // justifyContent: "center",
        paddingVertical: 30,
        paddingHorizontal: 25,
    },
    taskView: {},
});

export default TaskModal;
