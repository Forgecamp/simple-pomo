// eslint-disable-next-line no-unused-vars
// Core/First Party
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Platform,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { firebase } from "../../shared/helpers/firebase";
// Third Party Packages
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../shared/components/UI/HeaderButton";
import * as preferencesActions from "../../shared/store/actions/preferences";
import OptionsPanel from "./OptionsPanel";
// Additional Modules/Components
// Constants
import * as ColorConstants from "../../shared/constants/Colors";

const UserPreferencesScreen = (props) => {
    const dispatch = useDispatch();
    const prefState = useSelector((state) => state.preferences);
    const loading = useSelector((state) => state.preferences.loading);

    const [formState, setFormState] = useState({
        defaultFocus: { ...prefState.options.defaultFocus },
        defaultShortBreak: { ...prefState.options.defaultShortBreak },
        defaultLongBreak: { ...prefState.options.defaultLongBreak },
        autoContinue: { ...prefState.options.autoContinue },
        useSound: { ...prefState.options.useSound },
        cloudStorage: { ...prefState.options.cloudStorage },
    });

    const submitHandler = () => {
        dispatch(preferencesActions.savePreferences(formState));
    };

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        props.navigation.setOptions({
            headerRight: function SaveButton() {
                return (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item
                            title="Menu"
                            iconName={
                                Platform.OS === "android"
                                    ? "md-save"
                                    : "ios-save"
                            }
                            onPress={submitHandler}
                            color={
                                Platform.OS === "android" ? "white" : "black"
                            }
                        />
                    </HeaderButtons>
                );
            },
        });
    }, [submitHandler]);

    return loading ? (
        <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={ColorConstants.Notice} />
        </View>
    ) : (
        <OptionsPanel prefState={prefState} setFormState={setFormState} />
    );
};

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
});

export const ScreenOptions = () => {
    return {
        headerTitle: "Preferences",
    };
};

export default UserPreferencesScreen;
