import React from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TimerScreen, { TimerScreenOptions } from "../../../screens/TimerScreen";
import AboutScreen, {
    ScreenOptions as AboutScreenOptions,
} from "../../../screens/AboutScreen";
import UserPreferencesScreen, {
    ScreenOptions as PrefsScreenOptions,
} from "../../../screens/UserPreferencesScreen";
import AuthScreen from '../../../screens/AuthScreen';
import * as ColorsConstants from "../../constants/Colors";
import MenuButton from "../../components/UI/MenuButton";

const TimerStackNavigator = createStackNavigator();
const AboutStackNavigator = createStackNavigator();
const UserPrefsStackNavigator = createStackNavigator();
const AppDrawerNavigator = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();

const defaultScreenOptions = (navData) => {
    const isBreak = useSelector((state) => state.timer.isBreak);
    const color = isBreak ? ColorsConstants.Success : ColorsConstants.Notice;
    return {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? color : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : color,
        headerLeft: () => MenuButton(navData),
    };
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

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultScreenOptions}>
            <AuthStackNavigator.Screen 
                component={AuthScreen}
                name="Authentication"
                options={{
                    headerLeft: null,
                }}
            />
        </AuthStackNavigator.Navigator>
    )
}

export const AppNavigator = () => {
    return (
        
            <AppDrawerNavigator.Navigator
                drawerContentOptions={{
                    activeTintColor: ColorsConstants.Notice,
                }}
            >
                <AppDrawerNavigator.Screen
                    component={TimerNavigator}
                    name="Simple Pomo"
                    itemStyle={{ color: "red" }}
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
        
    );
};
