// Core
import React from "react";
import { View, FlatList } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = (props) => {
    // Takes a bunch of tasks and constructs a list out of them using TaskItems
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
