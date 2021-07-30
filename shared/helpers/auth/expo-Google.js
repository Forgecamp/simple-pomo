// Core
import React, { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
// Third Party
import { firebase } from "../firebase";
import GButton from "../../../assets/btn_google_signin.png";
import * as Google from "expo-auth-session/providers/google";
import * as authActions from "../../store/actions/auth";
// Constants
import ExpoConstants from "expo-constants";
import { useDispatch } from "react-redux";

const GoogleButton = (props) => {
    const dispatch = useDispatch();
    // Handles login via Google, triggered by the button this component returns
    const [gRequest, gResponse, gPromptAsync] = Google.useIdTokenAuthRequest({
        expoClientId: ExpoConstants.manifest.extra.EXPO_CLIENT,
    });

    useEffect(() => {
        if (gResponse?.type === "success") {
            const { params } = gResponse;
            const credential = firebase.auth.GoogleAuthProvider.credential(
                params.id_token
            );
            props.authHandler(credential);
        } else {
            dispatch(authActions.storeRes(JSON.stringify(gResponse)));
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
