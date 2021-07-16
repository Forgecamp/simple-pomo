import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
} from "react-native";
import GoogleButton from "../../shared/helpers/auth/Google";
import AppleButton from "../../shared/helpers/auth/Apple";
import { useDispatch } from "react-redux";
import * as authActions from "../../shared/store/actions/auth";
import * as preferencesActions from "../../shared/store/actions/preferences";
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const StartupScreen = () => {
    const dispatch = useDispatch();
    const handleAuth = (credential) => {
        dispatch(authActions.authenticate(credential));
    };

    return (
        <View style={styles.authScreen}>
            <View style={styles.splash}>
                <View style={styles.headline}>
                    <Text style={styles.headlineText}>
                        Thanks for using Simple Pomo!
                    </Text>
                </View>
                <View style={styles.subhead}>
                    <Text style={styles.subheadText}>
                        Please consider signing in securely for cloud storage of
                        your tasks and options.
                    </Text>
                </View>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <AppleButton authHandler={handleAuth} />
                </View>
                <View style={styles.buttonContainer}>
                    <GoogleButton authHandler={handleAuth} />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.cloudOptOutContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(preferencesActions.cloudOptOut());
                            }}
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
    input: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        width: 300,
        marginBottom: 10,
    },
    buttonContainer: {
        width: 300,
        margin: 5,
    },
    inputContainer: {
        alignItems: "flex-start",
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
        justifyContent: "center",
        marginHorizontal: 30,
    },
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
});

export default StartupScreen;
