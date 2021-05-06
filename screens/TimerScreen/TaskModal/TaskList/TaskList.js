import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

const TaskList = (props) => {
    return (
        <View>
            <FlatList
                data={props.tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(item) => {
                    return <Text>{item.item.title}</Text>;
                }}
            />
        </View>
    );
};

export default TaskList;
