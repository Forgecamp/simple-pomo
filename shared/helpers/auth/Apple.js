import React from "react";
import { View } from "react-native";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { firebase } from "../firebase";

const Apple = () => {
    const loginWithApple = async () => {
        const csrf = Math.random().toString(36).substring(2, 15);
        const nonce = Math.random().toString(36).substring(2, 10);
        const hashedNonce = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            nonce
        );
        const appleCredential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
            state: csrf,
            nonce: hashedNonce,
        });
        const { identityToken, email, state } = appleCredential;

        const provider = new firebase.auth.OAuthProvider("apple.com");
        const authCredential = provider.credential({
            idToken: identityToken,
            rawNonce: nonce,
        });
        firebase
            .auth()
            .signInWithCredential(authCredential)
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
                // An error occurred. If error.code == 'auth/missing-or-invalid-nonce',
                // make sure you're sending the SHA256-hashed nonce as a hex string
                // with your request to Apple.
                console.log(error);
            });
    };
    return (
        <View style={{ alignItems: "center" }}>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                    AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                    AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={5}
                style={{ width: 250, height: 50 }}
                onPress={loginWithApple}
            />
        </View>
    );
};

export default Apple;
