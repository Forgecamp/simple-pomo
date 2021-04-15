/* eslint-disable react/display-name */
// Core/First Party
import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Animated,
    Platform,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Third Party Packages
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Additional Modules/Components
import HeaderButton from "../../shared/components/UI/HeaderButton";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorConstants from "../../shared/constants/Colors";

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
        headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="About"
                    iconName={
                        Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default AboutScreen;
