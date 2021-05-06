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
import TaskActions from "../../../shared/store/actions/tasks";
const TaskModal = (props) => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState(null);
    const submitHandler = () => {
        dispatch(TaskActions.addTask(formInput));
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
                />
                <View style={styles.submitButtonContainer}>
                    <Button
                        title={"Submit"}
                        onPress={() => {
                            console.log("yo");
                        }}
                    />
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
        // justifyContent: "center",
        paddingVertical: Platform.OS === "android" ? 30 : 70,
        paddingHorizontal: 25,
    },
    taskView: {},
    taskInput: {
        borderWidth: 1,
        borderColor: "black",
    },
});

export default TaskModal;
