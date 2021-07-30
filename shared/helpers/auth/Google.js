// Core
import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
// Third Party
import { firebase } from "../firebase";
import * as Google from "expo-google-sign-in";
import GButton from "../../../assets/btn_google_signin.png";

const GoogleButton = (props) => {
    const [idToken, setIdToken] = useState(undefined);
    const [accessToken, setAccessToken] = useState(undefined);

    useEffect(() => {
        const gInit = async () => {
            Google.initAsync({
                isPromptEnabled: true,
            });
        };
        gInit();
    }, []);

    useEffect(() => {
        if (idToken !== undefined && accessToken !== undefined) {
            const credential = firebase.auth.GoogleAuthProvider.credential(
                idToken,
                accessToken
            );
            props.authHandler(credential);
        }
    }, [idToken, accessToken]);

    const signInWithGoogle = async () => {
        try {
            await Google.askForPlayServicesAsync();
            const { type, user } = await Google.signInAsync();
            if (type === "success") {
                setIdToken(() => user.auth.idToken);
                setAccessToken(() => user.auth.accessToken);
            }
        } catch ({ message }) {
            alert("login: Error:" + message);
        }
    };
    return (
        <TouchableOpacity
            onPress={async () => {
                signInWithGoogle();
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
