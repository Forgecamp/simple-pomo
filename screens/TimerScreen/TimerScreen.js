// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, Button } from "react-native";
// Third Party Packages
import { useDispatch, useSelector } from "react-redux";
// Additional Modules/Components
import Timer from "./Timer";
import TaskList from "./TaskList";
import ControlBar from "./ControlBar";
import MenuButton from "../../shared/components/UI/MenuButton";
import * as taskActions from "../../shared/store/actions/tasks";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const TimerScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(true);
    const dispatch = useDispatch();
    const tasksState = useSelector((state) => state.tasks);

    const resetTimerHandler = async () => {
        dispatch(taskActions.reset());
    };

    const stopHandler = async (skipAlert = false) => {
        if (skipAlert) {
            dispatch(taskActions.stop());
            return;
        }

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(taskActions.stop());
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const playPauseHandler = async () => {
        const currTime = new Date().getTime();
        const offset =
            (tasksState.isBreak
                ? tasksState.breakLength
                : tasksState.focusLength) -
            tasksState.timeElapsed / 1000;
        if (tasksState.isRunning) {
            dispatch(taskActions.playPause());
        } else {
            dispatch(taskActions.playPause(currTime + offset * 1000));
        }
    };

    return (
        <View style={styles.main}>
            <Timer
                timerLength={
                    tasksState.isBreak
                        ? tasksState.breakLength
                        : tasksState.focusLength
                }
                timerKey={tasksState.key}
                resetTimerHandler={resetTimerHandler}
                playPauseHandler={playPauseHandler}
                isRunning={tasksState.isRunning}
                color={
                    tasksState.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
                title={tasksState.isBreak ? "Break" : "Focus"}
                onComplete={() => {
                    stopHandler(true);
                }}
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={() => stopHandler()}
                isRunning={tasksState.isRunning}
                color={
                    tasksState.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
            />
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <Button
                    title="Modal"
                    onPress={() => {
                        setModalVisible((prev) => !prev);
                    }}
                />
                <TaskList />
            </Modal>
            <Button
                title="Modal"
                onPress={() => {
                    setModalVisible((prev) => !prev);
                }}
            />
        </View>
    );
};

export const ScreenOptions = (navData) => {
    return {
        headerTitle: "Simple Pomo",
        headerLeft: () => MenuButton(navData),
    };
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 3 * ExpoConstants.statusBarHeight,
        backgroundColor: "#ecf0f1",
    },
});

export default TimerScreen;
