import React, {useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
// import { firebase } from "../../shared/helpers/firebase";
import { AppNavigator, AuthNavigator } from '../AppNavigator';
import * as ColorsConstant from '../../constants/Colors';
import * as taskActions from "../../store/actions/tasks";
import * as preferencesActions from "../../store/actions/preferences";

const StartUpNavigator = (props) => {
    const dispatch = useDispatch();
    const prefs = useSelector((state) => state.preferences.options);
    const useCloud = prefs.cloudStorage?.value === 1 ? true : false;
    const uid = useSelector((state) => state.auth.uid);
    const loading = useSelector((state) => state.preferences.loading);

    useEffect(() => {
    // The code that triggers loading existing tasks from internal DB/cloud
    const loadHandler = async () => {
        if (loading) {
            await dispatch(taskActions.loadTasks());
            await dispatch(preferencesActions.loadPreferences());
        }
    };

    loadHandler();
    }, [loading]);


    return loading ? (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
        }}>
            <ActivityIndicator size="large" color={ColorsConstant.Notice} />
        </View>
    ) : (
        <NavigationContainer>
            {uid && <AppNavigator />}
            {!uid && useCloud && <AuthNavigator />}
            {!uid && !useCloud && <AppNavigator />}
        </NavigationContainer>
    );
};

export default StartUpNavigator;
