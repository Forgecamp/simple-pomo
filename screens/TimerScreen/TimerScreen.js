// Core
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import TaskModal from "./TaskModal";
import ControlBar from "./ControlBar";
// Shared
import * as timerActions from "../../shared/store/actions/timer";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const TimerScreen = (props) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const timerState = useSelector((state) => state.timer);
    const taskList = useSelector((state) => state.tasks.tasks);
    const loading = useSelector((state) => state.tasks.loading);
    const prefState = useSelector((state) => state.preferences);

    const currentTask = taskList.length > 0 ? taskList[0].title : "Focus";
    const currentTaskId = taskList.length > 0 ? taskList[0].id : "null";
    const currentTaskCount = taskList.length > 0 ? taskList[0].count : 0;

    const autoContinue = prefState.options.autoContinue
        ? prefState.options.autoContinue.value
        : 0;
    const useSound = prefState.options.useSound
        ? prefState.options.useSound.value
        : 0;
    const isBreak = timerState.isBreak;

    useEffect(() => {
        // These options concern how notifications are handled while app is active
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: false,
                shouldPlaySound: useSound ? true : false,
            }),
        });
    }, [useSound]);

    // Handlers for controlling the timer, to be passed to assorted components as needed
    const resetTimerHandler = async () => {
        dispatch(timerActions.reset());
    };

    const stopHandler = async (skipAlert = false) => {
        if (skipAlert) {
            dispatch(
                timerActions.stop(
                    timerState.isBreak,
                    currentTaskId,
                    currentTaskCount,
                    autoContinue
                )
            );
            return;
        }

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(
                            timerActions.stop(
                                timerState.isBreak,
                                currentTaskId,
                                currentTaskCount
                            )
                        );
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const playPauseHandler = async (isAuto = false) => {
        const currTime = new Date().getTime();
        const offset =
            (timerState.isBreak
                ? timerState.breakLength
                : timerState.focusLength) -
            timerState.timeElapsed / 1000;
        if (timerState.isRunning && !isAuto) {
            dispatch(timerActions.playPause());
        } else {
            dispatch(timerActions.playPause(currTime + offset * 1000));
        }
    };

    const toggleModalHandler = () => {
        setModalVisible((prev) => !prev);
    };

    // Ensure we don't show a busted app while things are loading async
    return loading ? (
        <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={ColorsConstant.Notice} />
        </View>
    ) : (
        <View style={styles.main}>
            {/* The main event, with control handlers passed down where appropriate */}
            <Timer
                resetTimerHandler={resetTimerHandler}
                playPauseHandler={playPauseHandler}
                color={isBreak ? ColorsConstant.Success : ColorsConstant.Notice}
                title={isBreak ? "Break" : currentTask}
                onComplete={() => {
                    stopHandler(true);
                    if (autoContinue && !isBreak) {
                        playPauseHandler(true);
                    }
                }}
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={() => stopHandler()}
                isRunning={timerState.isRunning}
                color={isBreak ? ColorsConstant.Success : ColorsConstant.Notice}
            />
            {/* Modal Button */}
            <View style={styles.modalOpener}>
                <TouchableOpacity onPress={toggleModalHandler}>
                    <Ionicons
                        name={
                            Platform.OS === "ios"
                                ? "ios-add-circle"
                                : "md-add-circle"
                        }
                        size={35}
                        color={
                            isBreak
                                ? ColorsConstant.Success
                                : ColorsConstant.Notice
                        }
                    />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <TaskModal modalHandler={toggleModalHandler} />
            </Modal>
        </View>
    );
};

export const ScreenOptions = () => {
    return {
        headerTitle: "Simple Pomo",
    };
};

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    main: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 3 * ExpoConstants.statusBarHeight,
        height: "100%",
    },
    modalOpener: {
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TimerScreen;
