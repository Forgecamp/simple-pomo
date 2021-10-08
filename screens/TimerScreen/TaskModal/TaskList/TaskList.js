// Core
import React from "react";
import { View, FlatList, Text, StyleSheet, Platform } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
    // Takes a bunch of tasks and constructs a list out of them using TaskItems
    return (
        <View
            style={{
                height: "100%",
            }}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>Tasks</Text>
            </View>
            <FlatList
                data={props.tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => {
                    return <TaskItem item={item.item} />;
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === "android" ? 10 : 40,
        alignItems: "center",
        // minHeight: 70,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 22,
    },
});

export default TaskList;
