// TODO: Basic stack and drawer navigatiors that lead to placeholder pages.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TimerScreen from "../../../screens/TimerScreen";
import AboutScreen from "../../../screens/AboutScreen";
import UserPreferencesScreen from "../../../screens/UserPreferencesScreen";

const TimerStackNavigator = createStackNavigator();
const AboutStackNavigator = createStackNavigator();
const UserPrefsStackNavigator = createStackNavigator();
const AppDrawerNavigator = createDrawerNavigator();

const TimerNavigator = () => {
    return (
        <TimerStackNavigator.Navigator>
            <TimerStackNavigator.Screen
                component={TimerScreen}
                name="Timer"
                options={{
                    title: "SimplePomo",
                }}
            />
        </TimerStackNavigator.Navigator>
    );
};

const AboutNavigator = () => {
    return (
        <AboutStackNavigator.Navigator>
            <AboutStackNavigator.Screen component={AboutScreen} name="About" />
        </AboutStackNavigator.Navigator>
    );
};

const UserPrefsNavigator = () => {
    return (
        <UserPrefsStackNavigator.Navigator>
            <UserPrefsStackNavigator.Screen
                component={UserPreferencesScreen}
                name="Preferences"
            />
        </UserPrefsStackNavigator.Navigator>
    );
};

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppDrawerNavigator.Navigator>
                <AppDrawerNavigator.Screen
                    component={TimerNavigator}
                    name="TimerNavigator"
                />
                <AppDrawerNavigator.Screen
                    component={AboutNavigator}
                    name="AboutNavigator"
                />
                <AppDrawerNavigator.Screen
                    component={UserPrefsNavigator}
                    name="UserPrefsNavigator"
                />
            </AppDrawerNavigator.Navigator>
        </NavigationContainer>
    );
};
