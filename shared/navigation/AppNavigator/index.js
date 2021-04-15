// TODO: Basic stack and drawer navigatiors that lead to placeholder pages.
import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TimerScreen, {
    ScreenOptions as TimerScreenOptions,
} from "../../../screens/TimerScreen";
import AboutScreen, {
    ScreenOptions as AboutScreenOptions,
} from "../../../screens/AboutScreen";
import UserPreferencesScreen, {
    ScreenOptions as PrefsScreenOptions,
} from "../../../screens/UserPreferencesScreen";
import * as ColorConstants from "../../constants/Colors";

const TimerStackNavigator = createStackNavigator();
const AboutStackNavigator = createStackNavigator();
const UserPrefsStackNavigator = createStackNavigator();
const AppDrawerNavigator = createDrawerNavigator();

const defaultScreenOptions = {
    headerStyle: {
        backgroundColor:
            Platform.OS === "android" ? ColorConstants.Notice : "white",
    },
    headerTintColor:
        Platform.OS === "android" ? "white" : ColorConstants.Notice,
};

const TimerNavigator = () => {
    return (
        <TimerStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <TimerStackNavigator.Screen
                component={TimerScreen}
                name="Timer"
                options={TimerScreenOptions}
            />
        </TimerStackNavigator.Navigator>
    );
};

const AboutNavigator = () => {
    return (
        <AboutStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <AboutStackNavigator.Screen
                component={AboutScreen}
                name="About"
                options={AboutScreenOptions}
            />
        </AboutStackNavigator.Navigator>
    );
};

const UserPrefsNavigator = () => {
    return (
        <UserPrefsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <UserPrefsStackNavigator.Screen
                component={UserPreferencesScreen}
                name="Preferences"
                options={PrefsScreenOptions}
            />
        </UserPrefsStackNavigator.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppDrawerNavigator.Navigator
                drawerContentOptions={{
                    activeTintColor: ColorConstants.Notice,
                }}
            >
                <AppDrawerNavigator.Screen
                    component={TimerNavigator}
                    name="Simple Pomo"
                />
                <AppDrawerNavigator.Screen
                    component={UserPrefsNavigator}
                    name="Preferences"
                />
                <AppDrawerNavigator.Screen
                    component={AboutNavigator}
                    name="About"
                />
            </AppDrawerNavigator.Navigator>
        </NavigationContainer>
    );
};
