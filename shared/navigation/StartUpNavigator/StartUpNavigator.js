import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { firebase } from "../../helpers/firebase";
import { AppNavigator, AuthNavigator } from "../AppNavigator";
import * as ColorsConstant from "../../constants/Colors";
import * as preferencesActions from "../../store/actions/preferences";
import * as authActions from "../../store/actions/auth";
import * as taskActions from "../../store/actions/tasks";

import { useAuthState } from "react-firebase-hooks/auth";

const appTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "white" },
};

const StartUpNavigator = (props) => {
    const prefs = useSelector((state) => state.preferences.options);
    const useCloud = prefs.cloudStorage?.value === 1 ? true : false;
    const dispatch = useDispatch();

    const uid = useSelector((state) => state.auth.uid);
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
