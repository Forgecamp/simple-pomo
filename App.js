import React, { useState, useEffect } from "react";
import { AppNavigator } from "./shared/navigation/AppNavigator";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return { shouldShowAlert: true };
    },
});

export default function App() {
    return <AppNavigator />;
}
