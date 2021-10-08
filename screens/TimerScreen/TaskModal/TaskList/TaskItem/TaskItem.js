// Core
import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TextInput,
    Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as taskActions from "../../../../../shared/store/actions/tasks";
import * as timerActions from "../../../../../shared/store/actions/timer";

const TaskItem = (props) => {
    const [editing, setEditing] = useState(false);
    const [formInput, setFormInput] = useState(props.item.title);
    const isBreak = useSelector((state) => state.timer.isBreak);
    const taskList = useSelector((state) => state.tasks.tasks);

    const dispatch = useDispatch();

    // A collection of methods that dispatches appropriate actions for the task controls to use
    const deleteButtonHandler = () => {
        dispatch(taskActions.removeTask(props.item.id));
        if (!isBreak && taskList[0].id === props.item.id)
            dispatch(timerActions.reset());
    };
    const plusButtonHandler = () => {
        dispatch(taskActions.incrementTask(props.item.id, props.item.count));
    };
    const minusButtonHandler = () => {
        dispatch(taskActions.decrementTask(props.item.id, props.item.count));
    };
    const editButtonHandler = () => {
        setEditing(() => true);
    };
    const discardButtonHandler = () => {
        setFormInput(() => null);
        setEditing(() => false);
    };

    // Handles submission of edited titles
    // Includes much of the same logic as the initial task submission
    const submitButtonHandler = () => {
        if (formInput.trim().length === 0) {
            Alert.alert("Error", "Please enter a name for this task.", [
                { text: "Close" },
            ]);
        } else {
            dispatch(taskActions.updateTask(props.item.id, formInput));
            setFormInput(() => null);
            setEditing(() => false);
        }
    };

    return (
        <View style={styles.item}>
            {editing && (
                <View style={styles.screen}>
                    <TextInput
                        placeholder={props.item.title}
                        onChangeText={(text) => setFormInput(text)}
                        value={formInput}
                        style={{
                            fontSize: 16,
                            height: 16,
                            marginTop: 6,
                        }}
                    />
                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={submitButtonHandler}
                            style={styles.controlElement}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-checkmark-circle-outline"
                                        : "md-checkmark-circle-outline"
                                }
                                size={24}
                                color={"green"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={discardButtonHandler}
                            style={styles.deleteButton}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-trash-bin-outline"
                                        : "md-trash-bin-outline"
                                }
                                size={24}
                                color={"red"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {/* Regular task display begins here */}
            {!editing && (
                <View style={styles.screen}>
                    <Text style={{ fontSize: 16 }}>{props.item.title}</Text>
                    <View style={styles.controls}>
                        <TouchableOpacity
                            onPress={editButtonHandler}
                            style={styles.controlElement}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-pencil"
                                        : "md-create-outline"
                                }
                                size={24}
                                color={"black"}
                            />
                        </TouchableOpacity>
                        {/* Increment the number of times a task is repeated */}
                        <TouchableOpacity
                            onPress={plusButtonHandler}
                            style={styles.controlElement}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-arrow-up-circle"
                                        : "md-arrow-up-circle"
                                }
                                size={24}
                                color={"black"}
                            />
                        </TouchableOpacity>
                        <Text style={styles.controlElement}>
                            {props.item.count + 1}
                        </Text>
                        {/* Decrement the number of times a task is repeated */}
                        <TouchableOpacity
                            onPress={minusButtonHandler}
                            style={styles.controlElement}
                            disabled={props.item.count === 0}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-arrow-down-circle"
                                        : "md-arrow-down-circle"
                                }
                                size={24}
                                color={
                                    props.item.count === 0 ? "gray" : "black"
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={deleteButtonHandler}
                            style={styles.deleteButton}
                        >
                            <Ionicons
                                name={
                                    Platform.OS === "ios"
                                        ? "ios-close-circle-outline"
                                        : "md-close-circle-outline"
                                }
                                size={24}
                                color={"red"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
    },
    controlElement: {
        paddingHorizontal: 5,
        fontSize: 16,
    },
    deleteButton: {
        paddingLeft: 10,
    },
    item: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginBottom: 5,
    },
});

export default TaskItem;
