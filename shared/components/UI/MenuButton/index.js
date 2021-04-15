import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ColorConstants from "../../../constants/Colors";
import HeaderButton from "../HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const MenuButton = (navData) => {
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
                color={
                    Platform.OS === "android" ? "white" : ColorConstants.Notice
                }
            />
        </HeaderButtons>
    );
};

export default MenuButton;
