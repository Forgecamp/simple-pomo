// Core
import React from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// Shared
import HeaderButton from "../HeaderButton";
// Constants
import * as ColorsConstants from "../../../constants/Colors";

const MenuButton = (navData) => {
    const isBreak = useSelector((state) => state.timer.isBreak);
    const color = isBreak ? ColorsConstants.Success : ColorsConstants.Notice;
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                color={Platform.OS === "android" ? "white" : color}
            />
        </HeaderButtons>
    );
};

export default MenuButton;
