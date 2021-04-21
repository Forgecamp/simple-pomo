import React from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ColorsConstants from "../../../constants/Colors";
import HeaderButton from "../HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const MenuButton = (navData) => {
    const isBreak = useSelector((state) => state.tasks.isBreak);
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
