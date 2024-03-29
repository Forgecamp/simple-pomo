/* eslint-disable react/prop-types */
// Core
import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
// Constants
import * as ColorConstant from "../../../../shared/constants/Colors";

const BinaryOption = (props) => {
    // We're being literal with "binary option", using 1 for 'true' and 0 for 'false',
    // to ensure the DB plays nice
    const [buttonState, setButtonState] = useState(props.item.value);
    const binaryChangeHandler = () => {
        props.setFormState((prev) => {
            const newVal = prev[props.item.name].value === 1 ? 0 : 1;
            prev[props.item.name].value = newVal;
            setButtonState(newVal);
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
                    <TouchableOpacity
                        style={{
                            ...styles.input,
                            ...{
                                backgroundColor:
                                    buttonState === 1
                                        ? ColorConstant.Success
                                        : "grey",
                            },
                        }}
                        onPress={binaryChangeHandler}
                    >
                        <Text style={styles.binaryDisplay}>
                            {buttonState === 1 ? "On" : "Off"}
                        </Text>
                    </TouchableOpacity>
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
        paddingRight: 20,
    },
    input: {
        width: "20%",
        paddingVertical: 1,
        paddingHorizontal: 5,
        alignItems: "center",
    },
    binaryDisplay: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        color: "white",
        fontWeight: "bold",
    },
});

export default BinaryOption;
