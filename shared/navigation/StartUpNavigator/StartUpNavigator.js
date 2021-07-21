// Core
import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppNavigator, AuthNavigator } from "../AppNavigator";
// Third Party
import { firebase } from "../../helpers/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// Shared
import * as preferencesActions from "../../store/actions/preferences";
import * as authActions from "../../store/actions/auth";
import * as taskActions from "../../store/actions/tasks";
// Constants
import * as ColorsConstant from "../../constants/Colors";

const appTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "white" },
};

const StartUpNavigator = (props) => {
    // This navigator handles authentication flow
    const prefs = useSelector((state) => state.preferences.options);
    const useCloud = prefs.cloudStorage?.value === 1 ? true : false;
    const dispatch = useDispatch();

    const uid = useSelector((state) => state.auth.uid);
    const [user, loading, error] = useAuthState(firebase.auth());

    // If Firebase logs someone in, let the app store know
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(authActions.setUser(user));
        }
        if (!user) {
            dispatch(authActions.setUser({ uid: undefined }));
        }
    });

    useEffect(() => {
        // The code that triggers loading existing tasks from internal DB/cloud
        dispatch(taskActions.setTasksLoading());
        dispatch(taskActions.loadTasks());
        dispatch(preferencesActions.loadPreferences());
    }, [uid]);

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
        <NavigationContainer theme={appTheme}>
            {useCloud && !user && <AuthNavigator />}
            {(!useCloud || user) && <AppNavigator />}
        </NavigationContainer>
    );
};

export default StartUpNavigator;
