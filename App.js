import React from "react";
import { AppNavigator } from "./shared/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import timerReducer from "./shared/store/reducers/timer";
import ReduxThunk from "redux-thunk";

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return { shouldShowAlert: true };
    },
});

const rootReducer = combineReducers({
    timer: timerReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}
