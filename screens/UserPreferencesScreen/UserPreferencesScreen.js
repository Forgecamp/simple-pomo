// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Button,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Third Party Packages
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../shared/components/UI/HeaderButton";
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants
import * as ColorConstants from "../../shared/constants/Colors";

const UserPreferencesScreen = () => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.section}>
                    <Text style={styles.header}>Focus Period Length: </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>
                        Short Break Period Length:{" "}
                    </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>
                        Long Break Period Length:{" "}
                    </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>
                        Begin Break Automatically:{" "}
                    </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Sound After Period Ends: </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Sync Tasks via Cloud: </Text>
                    <Text style={styles.subHeader}>Lorem ipsum</Text>
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
});

export const ScreenOptions = (navData) => {
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
                            console.log("save");
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
