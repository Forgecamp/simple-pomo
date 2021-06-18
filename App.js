import React from "react";
import { AppNavigator } from "./shared/navigation/AppNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import timerReducer from "./shared/store/reducers/timer";
import tasksReducer from "./shared/store/reducers/tasks";
import preferencesReducer from "./shared/store/reducers/preferences";
import authReducer from "./shared/store/reducers/auth";
import ReduxThunk from "redux-thunk";
import StartupScreen from "./screens/StartupScreen";

import { init } from "./shared/helpers/db";

init()
    .then(() => {
        console.log("Initialized DB");
    })
    .catch((err) => {
        console.log("DB failed to initialize");
        console.log(err);
    });

const rootReducer = combineReducers({
    timer: timerReducer,
    tasks: tasksReducer,
    preferences: preferencesReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <StartupScreen />
        </Provider>
    );
}
