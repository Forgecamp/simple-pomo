// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
// Third Party Packages
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants

const UserPreferencesScreen = () => {
    return (
        <View>
            <Text>User Preferences Screen</Text>
        </View>
    );
};

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "Preferences",
        headerLeft: () => MenuButton(navData),
    };
};

export default UserPreferencesScreen;
