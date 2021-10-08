// Core
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import StartUpNavigator from "./shared/navigation/StartUpNavigator";
import { init } from "./shared/helpers/db";
// Middleware
import ReduxThunk from "redux-thunk";
// Reducers
import authReducer from "./shared/store/reducers/auth";
import timerReducer from "./shared/store/reducers/timer";
import tasksReducer from "./shared/store/reducers/tasks";
import preferencesReducer from "./shared/store/reducers/preferences";

// Initializes the internal DB
init()
    .then(() => {
        console.log("Initialized DB");
    })
    .catch((err) => {
        console.log("DB failed to initialize");
        console.log(err);
    });

// Create the root reducer
const rootReducer = combineReducers({
    timer: timerReducer,
    tasks: tasksReducer,
    preferences: preferencesReducer,
    auth: authReducer,
});

// Initialize the store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Load the app
export default function App() {
    return (
        <Provider store={store}>
            <StartUpNavigator />
        </Provider>
    );
}
