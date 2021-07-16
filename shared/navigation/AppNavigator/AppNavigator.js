import React from "react";
import { Platform, View, SafeAreaView, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {
    createDrawerNavigator,
    DrawerItemList,
    DrawerItem,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import TimerScreen, { TimerScreenOptions } from "../../../screens/TimerScreen";
import AboutScreen, {
    ScreenOptions as AboutScreenOptions,
} from "../../../screens/AboutScreen";
import UserPreferencesScreen, {
    ScreenOptions as PrefsScreenOptions,
} from "../../../screens/UserPreferencesScreen";
import AuthScreen from "../../../screens/AuthScreen";
import * as ColorsConstants from "../../constants/Colors";
import MenuButton from "../../components/UI/MenuButton";
import { firebase } from "../../helpers/firebase";
import * as prefsActions from "../../store/actions/preferences";
import { Ionicons } from "@expo/vector-icons";

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
                name="Simple Pomo"
                options={{
                    headerLeft: null,
                }}
            />
        </AuthStackNavigator.Navigator>
    );
};

const CustomDrawerContent = (props) => {
    const auth = firebase.auth();
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label={auth.currentUser ? "Log Out" : "Log In"}
                labelStyle={{ color: "black" }}
                icon={({ size }) => (
                    <Ionicons name="md-person-circle" size={size} />
                )}
                onPress={() => {
                    if (auth.currentUser) {
                        auth.signOut();
                    } else {
                        dispatch(prefsActions.cloudOptIn());
                    }
                }}
            />
        </DrawerContentScrollView>
    );
};

export const AppNavigator = () => {
    const isBreak = useSelector((state) => state.timer.isBreak);
    const color = isBreak ? ColorsConstants.Success : ColorsConstants.Notice;
    return (
        <AppDrawerNavigator.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: color,
                labelStyle: {
                    color: "black",
                },
            }}
        >
            <AppDrawerNavigator.Screen
                component={TimerNavigator}
                name="Simple Pomo"
                options={{
                    title: "Simple Pomo",
                    // eslint-disable-next-line react/display-name
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={
                                Platform.OS === "ios"
                                    ? "ios-timer-outline"
                                    : "md-timer-outline"
                            }
                            size={size}
                            color={"black"}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={UserPrefsNavigator}
                name="Preferences"
                options={{
                    title: "Preferences",
                    // eslint-disable-next-line react/display-name
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={
                                Platform.OS === "ios"
                                    ? "ios-options"
                                    : "md-options"
                            }
                            size={size}
                            color={"black"}
                        />
                    ),
                }}
            />
            <AppDrawerNavigator.Screen
                component={AboutNavigator}
                name="About"
                options={{
                    title: "About",
                    // eslint-disable-next-line react/display-name
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={
                                Platform.OS === "ios"
                                    ? "ios-information-circle-outline"
                                    : "md-information-circle-outline"
                            }
                            size={size}
                            color={"black"}
                        />
                    ),
                }}
            />
        </AppDrawerNavigator.Navigator>
    );
};
