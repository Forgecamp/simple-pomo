/* eslint-disable react/prop-types */
// Core
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { Text, View, TextInput, StyleSheet } from "react-native";

const NumericInput = (props) => {
    // You'll see things divided by 60 a lot
    // Options are stored as seconds, but displayed as minutes
    const isFocused = useIsFocused();
    // formInput is mainly used to ensure only useful values reach the formState
    // while not unduly constraining user input
    const [formInput, setFormInput] = useState(
        (props.item.value / 60).toString()
    );
    const initialValue = useSelector((state) =>
        (state.preferences.options[props.item.name].value / 60).toString()
    );

    useEffect(() => {
        // If somebody navigates away from the screen without saving, go back to initial values
        textChangeHandler(initialValue);
    }, [isFocused]);

    const textChangeHandler = (text) => {
        // We only want numbers, since these are all numeric options
        let validatedText = text.replace(/[^0-9]/g, "");
        setFormInput(validatedText);
        props.setFormState((prev) => {
            prev[props.item.name].value = parseInt(validatedText) * 60;
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
                        onChangeText={textChangeHandler}
                        value={formInput}
                        onBlur={() => {
                            if (!formInput || formInput < 1) {
                                textChangeHandler(initialValue);
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    header: {
        fontWeight: "bold",
        fontSize: 17,
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
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    desc: {
        width: "80%",
        paddingRight: 20,
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
