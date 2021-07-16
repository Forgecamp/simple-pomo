import React, { useEffect } from "react";
import { View, Button, Image, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { firebase } from "../firebase";
import ExpoConstants from "expo-constants";
import GButton from "../../../assets/btn_google_signin.png";

const GoogleButton = (props) => {
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
