import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
    return (
        <View>
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

export default TaskList;
