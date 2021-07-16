import React from "react";
import { View, Platform } from "react-native";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";
import { firebase } from "../firebase";

const Apple = (props) => {
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
        props.authHandler(authCredential);
    };
    return Platform.OS === "ios" ? (
        <View style={{ alignItems: "center" }}>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                    AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
                }
                buttonStyle={
                    AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={5}
                style={{ width: 290, height: 60 }}
                onPress={loginWithApple}
            />
        </View>
    ) : null;
};

export default Apple;
