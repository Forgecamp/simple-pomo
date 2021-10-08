/* eslint-disable react/prop-types */
// Core
import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import NumericOption from "./NumericOption";
import BinaryOption from "./BinaryOption";

const OptionsPanel = (props) => {
    // Mostly just a wrapper for the different types of options
    const options = useSelector((state) => state.preferences.options);
    const numericOptions = [
        options.defaultFocus,
        options.defaultShortBreak,
        options.defaultLongBreak,
    ];
    const binaryOptions = [options.useSound, options.autoContinue];
    return (
        <View style={styles.screen}>
            <FlatList
                data={[...numericOptions, ...binaryOptions]}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => {
                    return index <= 2 ? (
                        <NumericOption
                            item={item}
                            setFormState={props.setFormState}
                        />
                    ) : (
                        <BinaryOption
                            item={item}
                            setFormState={props.setFormState}
                        />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});

export default OptionsPanel;
