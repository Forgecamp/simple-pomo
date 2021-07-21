// Core
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    TextInput,
    Button,
    Alert,
    KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./TaskList";
// Shared
import * as taskActions from "../../../shared/store/actions/tasks";
import * as Colors from "../../../shared/constants/Colors";

const TaskModal = (props) => {
    // This component is largely concerned with the task submission form
    // It also wraps the TaskList which handles displaying current tasks

    const dispatch = useDispatch();
    const isBreak = useSelector((state) => state.timer.isBreak);
    const tasks = useSelector((state) => state.tasks.tasks);
    const [formInput, setFormInput] = useState("");

    const submitHandler = () => {
        // Check to ensure they're not submitting empty strings
        if (formInput.trim().length === 0) {
            Alert.alert("Error", "Please enter a name for this task.", [
                { text: "Close" },
            ]);
        } else {
            dispatch(taskActions.addTask(formInput));
            // Reset the input once it's submitted
            setFormInput(() => "");
        }
    };
    return (
        <KeyboardAvoidingView style={styles.modal}>
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
                <View style={styles.header}>
                    <Text style={styles.headerText}>Tasks</Text>
                </View>
                <TaskList tasks={tasks} />
            </View>
            {/* Where task entry occurs */}
            <View style={styles.taskForm}>
                <TextInput
                    style={styles.taskInput}
                    onChangeText={(text) => setFormInput(text)}
                    maxLength={20}
                    placeholder={"Add New Task"}
                    value={formInput}
                />
                <View style={styles.submitButtonContainer}>
                    <Button
                        title={"Save"}
                        onPress={submitHandler}
                        color={isBreak ? Colors.Success : Colors.Notice}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        right: 2,
        top: Platform.OS === "android" ? 2 : 40,
    },
    modal: {
        height: "100%",
        paddingVertical: Platform.OS === "android" ? 10 : 40,
        paddingHorizontal: 25,
        justifyContent: "space-between",
        flex: 1,
    },
    header: {
        alignItems: "center",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22,
    },
    taskInput: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
});

export default TaskModal;
