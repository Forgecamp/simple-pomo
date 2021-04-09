// TODO: Basic stack and drawer navigatiors that lead to placeholder pages.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TimerScreen from "../../../screens/TimerScreen";

const AppStackNavigator = createStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppStackNavigator.Navigator>
                <AppStackNavigator.Screen
                    component={TimerScreen}
                    name="TimerScreen"
                />
            </AppStackNavigator.Navigator>
        </NavigationContainer>
    );
};
