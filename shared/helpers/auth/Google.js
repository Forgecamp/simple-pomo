import React, { useEffect } from "react";
import { View, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { firebase } from "../firebase";
import ExpoConstants from "expo-constants";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const GoogleButton = () => {
    const dispatch = useDispatch();
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
            dispatch(authActions.authenticate(credential));
        }
    }, [gResponse]);

    return (
        <View>
            <Button
                title="Login with Google"
                onPress={() => {
                    gPromptAsync();
                }}
            />
        </View>
    );
};

export default GoogleButton;
