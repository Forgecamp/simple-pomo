import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Platform } from "react-native";
import ExpoConstants from "expo-constants";
import { firebase } from "../../shared/helpers/firebase";
import * as Google from "expo-auth-session/providers/google";
import Apple from "../../shared/helpers/auth/Apple";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../shared/store/actions/auth";

const StartupScreen = () => {
    const dispatch = useDispatch();
    const uid = useSelector((state) => state.auth.uid);

    const [gRequest, gResponse, gPromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: ExpoConstants.manifest.extra.EXPO_CLIENT,
        androidClientId: ExpoConstants.manifest.extra.ANDROID_KEY,
    });

    firebase.auth().onAuthStateChanged((user) => {
        dispatch(authActions.authenticate(user));
    });

    useEffect(() => {
        console.log(uid);
    }, [uid]);

    useEffect(() => {
        if (gResponse?.type === "success") {
            const { params } = gResponse;
            const credential = firebase.auth.GoogleAuthProvider.credential(
                params.id_token
            );

            firebase
                .auth()
                .signInWithCredential(credential)
                .then((response) => {
                    const uid = response.user.uid;
                    const email = response.user.email;
                    const data = {
                        id: uid,
                        email,
                        test: "test",
                    };
                    const usersRef = firebase.firestore().collection("users");
                    usersRef
                        .doc(uid)
                        .set(data)
                        .catch((error) => {
                            alert(error);
                        });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [gResponse]);

    return (
        <View style={styles.loadingScreen}>
            <View style={styles.buttonContainer}>
                <Apple />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login with Google"
                    onPress={() => {
                        gPromptAsync();
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Logout"
                    onPress={() => {
                        firebase.auth().signOut();
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
