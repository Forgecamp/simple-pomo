import React from "react";
import { View, StyleSheet, Button, ActivityIndicator } from "react-native";
import { firebase } from "../../shared/helpers/firebase";
import GoogleButton from "../../shared/helpers/auth/Google";
import Apple from "../../shared/helpers/auth/Apple";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../shared/store/actions/auth";
import * as preferencesActions from "../../shared/store/actions/preferences";
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const StartupScreen = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    firebase.auth().onAuthStateChanged((user) => {
        dispatch(authActions.setUser(user));
    });

    return loading ? (
        <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={ColorsConstant.Notice} />
        </View>
    ) : (
        <View style={styles.loadingScreen}>
            <View style={styles.buttonContainer}>
                <Apple />
            </View>
            <View style={styles.buttonContainer}>
                <GoogleButton />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Proceed Offline"
                    onPress={() => {
                        dispatch(preferencesActions.cloudOptOut());
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
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
});

export default StartupScreen;
