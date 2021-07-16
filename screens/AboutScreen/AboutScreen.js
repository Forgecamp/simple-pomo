// Core/First Party
import React from "react";
import {
    ScrollView,
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
import * as ColorsConstant from "../../shared/constants/Colors";

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
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.info}>
                    <View style={styles.headline}>
                        <Text style={styles.title}>Simple Pomo</Text>
                        <Text style={styles.subtitle}>
                            by D. Williams; v0.0.1
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.header}>Privacy Policy: </Text>
                        <Text style={styles.subHeader}>
                            We will never sell or distribute your email address,
                            or any other information acquired from or related to
                            the use of this program, for any reason.
                        </Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.section}>
                        {/* This is probably just going to be an OS-specific direct app store link */}
                        <View style={styles.buttonContainer}>
                            <View style={styles.customButtonContainer}>
                                <TouchableOpacity
                                    onPress={handleRateApp}
                                    style={styles.customButton}
                                >
                                    <Text style={styles.customButtonText}>
                                        Rate & Review Simple Pomo
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        {/* A mailto to my Forgecamp Dev email */}
                        <View style={styles.buttonContainer}>
                            <View style={styles.customButtonContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(
                                            "mailto:forgecampdev@gmail.com"
                                        );
                                    }}
                                    style={styles.customButton}
                                >
                                    <Text style={styles.customButtonText}>
                                        Email the Developer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.buttonContainer}>
                            <View style={styles.customButtonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleDonate}
                                >
                                    <Image style={styles.kofi} source={icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
    },
    info: {
        width: "100%",
        marginBottom: 60,
    },
    headline: {
        alignItems: "center",
        width: "100%",
        marginTop: 25,
        marginBottom: 35,
    },
    title: {
        fontSize: 30,
    },
    subtitle: {
        fontSize: 14,
    },
    section: {
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingHorizontal: "7.5%",
    },
    buttons: {
        width: "100%",
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 30,
        textAlign: "left",
        width: "100%",
    },
    subHeader: {
        fontSize: 16,
        paddingLeft: 5,
    },
    kofi: {
        height: 59,
        // width: "100%",
        resizeMode: "contain",
    },
    buttonContainer: {
        width: "100%",
    },
    customButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    customButton: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor:
            Platform.OS === "ios" ? "white" : ColorsConstant.Notice,
    },
    customButtonText: {
        fontSize: 16,
        color: Platform.OS === "ios" ? ColorsConstant.Notice : "white",
    },
});

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "About",
        headerLeft: () => MenuButton(navData),
    };
};

export default AboutScreen;
