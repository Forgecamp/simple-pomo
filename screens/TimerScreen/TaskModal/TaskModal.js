import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
    TextInput,
    Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./TaskList";
import * as taskActions from "../../../shared/store/actions/tasks";
const TaskModal = (props) => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState(null);
    const submitHandler = () => {
        dispatch(taskActions.addTask(formInput));
        setFormInput(() => null);
    };
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
            <View style={styles.taskForm}>
                <TextInput
                    style={styles.taskInput}
                    onChangeText={(text) => setFormInput(text)}
                    maxLength={20}
                    placeholder={"Add New Task"}
                    value={formInput}
                />
                <View style={styles.submitButtonContainer}>
                    <Button title={"Submit"} onPress={submitHandler} />
                </View>
            </View>
        </View>
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
        paddingVertical: Platform.OS === "android" ? 40 : 70,
        paddingHorizontal: 25,
        justifyContent: "space-between",
        flex: 1,
    },
    taskForm: {},
    taskInput: {
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
});

export default TaskModal;
