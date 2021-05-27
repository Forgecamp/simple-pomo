/* eslint-disable react/prop-types */
import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

const NumericInput = (props) => {
    const textChangeHandler = (text) => {
        props.setFormState((prev) => {
            prev[props.item.name].value = parseInt(text) * 60;
            return prev;
        });
    };
    return (
        <View>
            <View style={styles.section}>
                <Text style={styles.header}>{props.item.fullName}</Text>
                <View style={styles.control}>
                    <View style={styles.desc}>
                        <Text style={styles.subHeader}>{props.item.desc}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        textAlign={"center"}
                        numeric
                        keyboardType={"numeric"}
                        placeholder={(props.item.value / 60).toString()}
                        onChangeText={textChangeHandler}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    section: {
        width: "100%",
        paddingHorizontal: "7.5%",
        paddingVertical: "5%",
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 30,
    },
    subHeader: {
        fontSize: 16,
        paddingLeft: 5,
    },
    logoutContainer: {
        width: "100%",
    },
    logoutButton: {
        fontWeight: "bold",
    },
    control: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    desc: {
        width: "80%",
    },
    input: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "20%",
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
});

export default NumericInput;
