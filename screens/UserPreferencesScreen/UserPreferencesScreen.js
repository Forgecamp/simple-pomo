// Core/First Party
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Button,
    Platform,
} from "react-native";
// eslint-disable-next-line no-unused-vars
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
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
        defaultFocus: prefState.options.defaultFocus,
        defaultShortBreak: prefState.options.defaultShortBreak,
        defaultLongBreak: prefState.options.defaultLongBreak,
        autoContinue: prefState.options.autoContinue,
        useSound: prefState.options.useSound,
        cloudStorage: prefState.options.cloudStorage,
    });

    const submitHandler = () => {
        const options = [];

        for (const key of Object.keys(formState)) {
            options.push({
                name: key,
                value: formState[key],
            });
        }
        dispatch(preferencesActions.savePreferences(options));
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
                                Platform.OS === "android"
                                    ? "white"
                                    : ColorConstants.Notice
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
        <View style={styles.screen}>
            <OptionsPanel prefState={prefState} setFormState={setFormState} />
            <View style={styles.section}>
                <View style={styles.logoutContainer}>
                    <Button
                        title="Logout"
                        titleStyle={styles.logoutButton}
                        color={ColorConstants.Caution}
                    />
                </View>
            </View>
        </View>
        // </ScrollView>
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
    screen: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    section: {
        marginBottom: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        padding: "7.5%",
    },
    header: {
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 30,
    },
    subHeader: {
        fontSize: 16,
        paddingLeft: 5,
    },
    logoutContainer: {
        width: "100%",
    },
    logoutButton: {
        fontWeight: "bold",
    },
    control: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    desc: {
        width: "80%",
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        width: "20%",
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
});

export const ScreenOptions = () => {
    return {
        headerTitle: "Preferences",
    };
};

export default UserPreferencesScreen;
