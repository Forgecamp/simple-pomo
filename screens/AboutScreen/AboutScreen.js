// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Platform,
    Image,
    TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
// Third Party Packages
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
import icon from "../../assets/kofi-stroke.png";
// Constants

const AboutScreen = () => {
    const handleRateApp = async () => {
        const storeLink =
            Platform.OS === "ios"
                ? "https://appstore.com/app/id/1575618998/"
                : "https://play.google.com/store/apps/details?id=com.forgecamp.simplepomo";
        await WebBrowser.openAuthSessionAsync(storeLink);
    };

    const handleDonate = async () => {
        await WebBrowser.openAuthSessionAsync("https://ko-fi.com/forgecamp");
    };

    return (
        <View style={styles.screen}>
            <View style={styles.headline}>
                <Text style={styles.title}>Simple Pomo</Text>
                <Text style={styles.subtitle}>v0.0.1</Text>
            </View>
            {/* The order of these things will probably get rearranged */}
            <View style={styles.section}>
                {/* This is probably just going to be an OS-specific direct app store link */}
                <Text style={styles.header} onPress={handleRateApp}>
                    Rate Simple Pomo on{" "}
                    {Platform.OS === "ios"
                        ? "the App Store"
                        : "Google Play store"}
                    !
                </Text>
                {/* <Text style={styles.subHeader}>Lorem ipsum</Text> */}
            </View>
            <View style={styles.section}>
                {/* A mailto to my Forgecamp Dev email */}
                <Text style={styles.header}>Feedback: </Text>
                <View>
                    <Text
                        style={{
                            ...styles.subHeader,
                            color: "blue",
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid",
                        }}
                        onPress={() => {
                            Linking.openURL("mailto:forgecampdev@gmail.com");
                        }}
                    >
                        Click here to email the developer
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                {/* A button that opens a modal browser window to my Ko-Fi page */}
                <Text style={styles.header}>Support the Developer: </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleDonate}
                    >
                        <Image style={styles.kofi} source={icon} />
                    </TouchableOpacity>
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
    kofi: {
        height: 50,
        width: 300,
        resizeMode: "contain",
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
});

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "About",
        headerLeft: () => MenuButton(navData),
    };
};

export default AboutScreen;
