import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "../../helpers/firebase";
import { AppNavigator, AuthNavigator } from "../AppNavigator";
import * as ColorsConstant from "../../constants/Colors";
import * as preferencesActions from "../../store/actions/preferences";
import * as authActions from "../../store/actions/auth";

import { useAuthState } from "react-firebase-hooks/auth";

const StartUpNavigator = (props) => {
    const prefs = useSelector((state) => state.preferences.options);
    const useCloud = prefs.cloudStorage?.value === 1 ? true : false;
    const dispatch = useDispatch();

    const [user, loading, error] = useAuthState(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(authActions.setUser(user));
        }
        if (!user) {
            dispatch(authActions.setUser({ uid: undefined }));
        }
    });

    useEffect(() => {
        dispatch(preferencesActions.loadPreferences());
    }, [loading]);

    return loading ? (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <ActivityIndicator size="large" color={ColorsConstant.Notice} />
        </View>
    ) : (
        <NavigationContainer>
            {useCloud && !user && <AuthNavigator />}
            {(!useCloud || user) && <AppNavigator />}
        </NavigationContainer>
    );
};

export default StartUpNavigator;
