// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
// Third Party Packages
// Additional Modules/Components
import MenuButton from "../../shared/components/UI/MenuButton";
// Constants

const AboutScreen = () => {
    return (
        <View>
            <Text>About Screen</Text>
        </View>
    );
};

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "About",
        headerLeft: () => MenuButton(navData),
    };
};

export default AboutScreen;
