// Core/First Party
import React, { useState, useEffect } from "react";
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

const UserPreferencesScreen = (props) => {
    const dispatch = useDispatch();
    const prefState = useSelector((state) => state.preferences);
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
        props.navigation.setOptions({
            headerRight: function SaveButton(navData) {
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
                            onChangeText={(text) => {
                                setFormState((prev) => {
                                    return {
                                        ...prev,
                                        defaultFocus: parseInt(text) * 60,
                                    };
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Short Break Length </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>In minutes:</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={(
                                prefState.options.defaultShortBreak / 60
                            ).toString()}
                            onChangeText={(text) => {
                                setFormState((prev) => {
                                    return {
                                        ...prev,
                                        defaultShortBreak: parseInt(text) * 60,
                                    };
                                });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Long Break Length </Text>
                    <View style={styles.control}>
                        <View style={styles.desc}>
                            <Text style={styles.subHeader}>In minutes:</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={(
                                prefState.options.defaultLongBreak / 60
                            ).toString()}
                            onChangeText={(text) => {
                                setFormState((prev) => {
                                    return {
                                        ...prev,
                                        defaultLongBreak: parseInt(text) * 60,
                                    };
                                });
                            }}
                        />
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
        paddingVertical: 1,
        paddingHorizontal: 5,
    },
});

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "Preferences",
    };
};

export default UserPreferencesScreen;
