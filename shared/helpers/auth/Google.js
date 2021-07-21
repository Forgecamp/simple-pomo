// Core
import React, { useEffect } from "react";
import { View, Button, Image, TouchableOpacity } from "react-native";
// Third Party
import { firebase } from "../firebase";
import GButton from "../../../assets/btn_google_signin.png";
import * as Google from "expo-auth-session/providers/google";
// Constants
import ExpoConstants from "expo-constants";

const GoogleButton = (props) => {
    // Handles login via Google, triggered by the button this component returns
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
            props.authHandler(credential);
        }
    }, [gResponse]);

    return (
        <TouchableOpacity
            onPress={() => {
                gPromptAsync();
            }}
        >
            <Image
                source={GButton}
                style={{ width: "100%", resizeMode: "contain" }}
            />
        </TouchableOpacity>
    );
};

export default GoogleButton;
