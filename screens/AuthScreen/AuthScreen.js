// Core
import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
// Third Party
import ExpoGoogleButton from "../../shared/helpers/auth/expo-Google";
import GoogleButton from "../../shared/helpers/auth/Google";
import AppleButton from "../../shared/helpers/auth/Apple";
// Shared
import * as authActions from "../../shared/store/actions/auth";
import * as preferencesActions from "../../shared/store/actions/preferences";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const StartupScreen = () => {
    const dispatch = useDispatch();

    // Dispatch third party credentials to authenticate users with Firebase
    const handleAuth = (credential) => {
        dispatch(authActions.authenticate(credential));
    };

    // Allows user to proceed without login, using internal DB
    const cloudOptOut = () => {
        dispatch(preferencesActions.cloudOptOut());
    };

    return (
        <ScrollView
            contentContainerStyle={{
                height: "100%",
                justifyContent: "space-between",
            }}
        >
            <View style={styles.authScreen}>
                <View style={styles.splash}>
                    <View style={styles.headline}>
                        <Text style={styles.headlineText}>
                            Thanks for using Simple Pomo!
                        </Text>
                    </View>
                    <View style={styles.subhead}>
                        <Text style={styles.subheadText}>
                            Simple Pomo is a time management tool utilizing
                            Francesco Cirillo&apos;s renowned Pomodoro
                            Technique, which breaks tasks down into managable
                            segments and encourages frequent, short breaks.
                        </Text>
                    </View>
                    <View style={styles.subhead}>
                        <Text style={styles.subheadText}>
                            Please consider signing in securely for cloud
                            storage of your tasks and options.
                        </Text>
                    </View>
                </View>
                <View style={styles.loginButtons}>
                    {/* AppleButton has own logic to determine if it should be shown or not */}
                    <View style={styles.buttonContainer}>
                        <AppleButton authHandler={handleAuth} />
                    </View>
                    {/* ExpoGoogleButton is basically only for the simulator */}
                    {ExpoConstants.appOwnership === "expo" && (
                        <View style={styles.buttonContainer}>
                            <ExpoGoogleButton authHandler={handleAuth} />
                        </View>
                    )}
                    {/* GoogleButton is always shown on standalone */}
                    {ExpoConstants.appOwnership === "standalone" && (
                        <View style={styles.buttonContainer}>
                            <GoogleButton authHandler={handleAuth} />
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <View style={styles.cloudOptOutContainer}>
                            <TouchableOpacity
                                onPress={cloudOptOut}
                                style={styles.cloudOptOutButton}
                            >
                                <Text style={styles.cloudOptOutText}>
                                    Proceed Offline
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    authScreen: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    main: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 3 * ExpoConstants.statusBarHeight,
        height: "100%",
    },
    modalOpener: {
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        width: 300,
        margin: 5,
    },
    label: {
        paddingBottom: 3,
    },
    cloudOptOutContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        paddingHorizontal: 5,
    },
    cloudOptOutButton: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor:
            Platform.OS === "ios" ? "white" : ColorsConstant.Notice,
    },
    cloudOptOutText: {
        fontSize: 16,
        color: Platform.OS === "ios" ? ColorsConstant.Notice : "white",
    },
    splash: {
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 30,
    },
    loginButtons: {},
    headline: {
        marginBottom: 10,
    },
    headlineText: {
        fontSize: 22,
        textAlign: "justify",
    },
    subheadText: {
        fontSize: 16,
        textAlign: "justify",
    },
    subhead: {
        paddingTop: 30,
    },
});

export default StartupScreen;
