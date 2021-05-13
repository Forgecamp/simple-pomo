import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as taskActions from "../../../../../shared/store/actions/tasks";
import * as timerActions from "../../../../../shared/store/actions/timer";

const TaskItem = (props) => {
    const isBreak = useSelector((state) => state.timer.isBreak);
    const taskList = useSelector((state) => state.tasks.tasks);

    const dispatch = useDispatch();
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
    return (
        <View style={styles.screen}>
            <Text>{props.item.title}</Text>
            <View style={styles.controls}>
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
                        color={props.item.count === 0 ? "gray" : "black"}
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
    );
};

const styles = StyleSheet.create({
    screen: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
        // borderBottomColor: "gray",
        // borderBottomWidth: 1,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
    },
    controlElement: {
        paddingHorizontal: 5,
    },
    deleteButton: {
        paddingLeft: 10,
    },
});

export default TaskItem;
