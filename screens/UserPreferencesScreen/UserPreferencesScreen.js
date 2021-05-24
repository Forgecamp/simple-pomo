// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Button,
    Platform,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
// Third Party Packages
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../shared/components/UI/HeaderButton";
import * as preferencesActions from "../../shared/store/actions/preferences";
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants
import * as ColorConstants from "../../shared/constants/Colors";

const UserPreferencesScreen = () => {
    const prefState = useSelector((state) => state.preferences);
    // console.log(prefState);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.section}>
                    <Text style={styles.header}>Focus Period Length </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>In minutes:</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={(
                                prefState.options.defaultFocus / 60
                            ).toString()}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Short Break Length </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>In minutes:</Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Long Break Length </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>In minutes:</Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>
                        Begin Breaks Automatically{" "}
                    </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>
                                Start breaks without prompting:
                            </Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Sound </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>
                                Play a sound when periods end:
                            </Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Cloud Sync </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>
                                Store tasks on the cloud:
                            </Text>
                        </View>
                        <TextInput style={styles.input} />
                    </View>
                </View>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    },
});

export const ScreenOptions = (navData) => {
    const dispatch = useDispatch();
    return {
        headerTitle: "Preferences",
        headerRight: function SaveButton(navData) {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Menu"
                        iconName={
                            Platform.OS === "android" ? "md-save" : "ios-save"
                        }
                        onPress={() => {
                            dispatch(
                                preferencesActions.savePreferences([
                                    { name: "defaultFocus", value: 500 },
                                    { name: "defaultShortBreak", value: 20 },
                                    { name: "defaultLongBreak", value: 300 },
                                ])
                            );
                        }}
                        color={
                            Platform.OS === "android"
                                ? "white"
                                : ColorConstants.Notice
                        }
                    />
                </HeaderButtons>
            );
        },
    };
};

export default UserPreferencesScreen;
