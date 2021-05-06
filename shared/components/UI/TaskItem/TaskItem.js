import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as taskActions from "../../../store/actions/tasks";
import * as Colors from "../../../constants/Colors";

const TaskItem = (props) => {
    const dispatch = useDispatch();
    const deleteButtonHandler = () => {
        dispatch(taskActions.removeTask(props.item.id));
    };
    const plusButtonHandler = () => {
        dispatch(taskActions.incrementTask(props.item.id));
    };
    const minusButtonHandler = () => {
        dispatch(taskActions.decrementTask(props.item.id));
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
                        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                        size={24}
                        color={Colors.Success}
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
                            Platform.OS === "ios" ? "ios-remove" : "md-remove"
                        }
                        size={24}
                        color={props.item.count === 0 ? "gray" : Colors.Notice}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={deleteButtonHandler}
                    style={styles.deleteButton}
                >
                    <Ionicons
                        name={
                            Platform.OS === "ios"
                                ? "ios-close-circle"
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
