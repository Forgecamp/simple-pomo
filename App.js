import React from "react";
import { AppNavigator } from "./shared/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import tasksReducer from "./shared/store/reducers/tasks";

// Notifications.setNotificationHandler({
//     handleNotification: async () => {
//         return { shouldShowAlert: true };
//     },
// });

const rootReducer = combineReducers({
    tasks: tasksReducer,
});

const store = createStore(rootReducer);

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
