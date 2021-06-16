import React, { useEffect } from "react";
import { View, StyleSheet, Button, Platform } from "react-native";
import ExpoConstants from "expo-constants";
import { firebase } from "../../shared/helpers/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import Crypto from "expo-crypto";

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

    const signInWithApple = () => {
        const nonce = Math.random().toString(36).substring(2, 10);

        return Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            nonce
        )
            .then((hashedNonce) =>
                AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                    nonce: hashedNonce,
                })
            )
            .then((appleCredential) => {
                console.log(appleCredential);
                // const { identityToken } = appleCredential;
                // const provider = new firebase.auth.OAuthProvider("apple.com");
                // const credential = provider.credential({
                //     idToken: identityToken,
                //     rawNonce: nonce,
                // });
                // return firebase.auth().signInWithCredential(credential);
                // // Successful sign in is handled by firebase.auth().onAuthStateChanged
            })
            .catch((error) => {
                // ...
            });
    };

    return (
        <View style={styles.loadingScreen}>
            <View style={styles.buttonContainer}>
                {Platform.OS === "ios" && (
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={
                            AppleAuthentication.AppleAuthenticationButtonType
                                .SIGN_IN
                        }
                        buttonStyle={
                            AppleAuthentication.AppleAuthenticationButtonStyle
                                .BLACK
                        }
                        cornerRadius={5}
                        style={{ width: 200, height: 44 }}
                        onPress={signInWithApple}
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
