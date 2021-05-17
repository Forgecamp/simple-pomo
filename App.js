import React from "react";
import { AppNavigator } from "./shared/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import timerReducer from "./shared/store/reducers/timer";
import tasksReducer from "./shared/store/reducers/tasks";
import preferencesReducer from "./shared/store/reducers/preferences";
import ReduxThunk from "redux-thunk";

import { init } from "./shared/helpers/db";

init()
    .then(() => {
        console.log("Initialized DB");
    })
    .catch((err) => {
        console.log("DB failed to initialize");
        console.log(err);
    });

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return { shouldShowAlert: true };
    },
});

const rootReducer = combineReducers({
    timer: timerReducer,
    tasks: tasksReducer,
    preferences: preferencesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
