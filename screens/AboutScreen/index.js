// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
// Third Party Packages
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants

const AboutScreen = () => {
    return (
        <View style={styles.screen}>
            <View style={styles.headline}>
                <Text style={styles.title}>Simple Pomo</Text>
                <Text style={styles.subtitle}>v0.0.1</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Rate: </Text>
                <Text style={styles.subHeader}>Lorem ipsum</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Feedback: </Text>
                <Text style={styles.subHeader}>Lorem ipsum</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Support the Developer: </Text>
                <Text style={styles.subHeader}>Lorem ipsum</Text>
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
    headline: {
        alignItems: "center",
        width: "100%",
        marginTop: 50,
        marginBottom: 50,
    },
    title: {
        fontSize: 30,
    },
    subtitle: {
        fontSize: 14,
    },
    section: {
        marginBottom: 20,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        padding: "7.5%",
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
});

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "About",
        headerLeft: () => MenuButton(navData),
    };
};

export default AboutScreen;
