import React from "react";
import { View, ActivityIndicator } from "react-native";
import { firebase } from "../../shared/helpers/firebase";
import { useSelector } from "react-redux";
import { useCollection } from "react-firebase-hooks/firestore";
import * as ColorsConstant from "../../shared/constants/Colors";
import TimerScreen from "./TimerScreen";

export const CloudWrapper = (props) => {
    const uid = useSelector((state) => state.auth.uid);
    const [snapshot, loading, error] = useCollection(
        firebase.firestore().collection("users").doc(uid)
    );
    console.log(loading);
    return <TimerScreen loading={loading} />;
};
