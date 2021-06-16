import React, { useEffect } from "react";
import { View, StyleSheet, Button, Platform } from "react-native";
import ExpoConstants from "expo-constants";
import { firebase } from "../../shared/helpers/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as Apple from "expo-apple-authentication";

const StartupScreen = () => {
    const [gRequest, gResponse, gPromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: ExpoConstants.manifest.extra.EXPO_CLIENT,
        androidClientId: ExpoConstants.manifest.extra.ANDROID_KEY,
    });

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
                {Platform.OS === "ios" && (
                    <Apple.AppleAuthenticationButton
                        buttonType={Apple.AppleAuthenticationButtonType.SIGN_IN}
                        buttonStyle={Apple.AppleAuthenticationButtonStyle.BLACK}
                        cornerRadius={5}
                        style={{ width: 200, height: 44 }}
                        onPress={async () => {
                            try {
                                const credential = await Apple.signInAsync({
                                    requestedScopes: [
                                        Apple.AppleAuthenticationScope
                                            .FULL_NAME,
                                        Apple.AppleAuthenticationScope.EMAIL,
                                    ],
                                });
                                // signed in
                                console.log(credential);
                            } catch (e) {
                                if (e.code === "ERR_CANCELED") {
                                    // handle that the user canceled the sign-in flow
                                } else {
                                    // handle other errors
                                }
                            }
                        }}
                    />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login with Google"
                    onPress={() => {
                        gPromptAsync();
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
