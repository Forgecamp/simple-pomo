// Core/First Party
import React, { useState } from "react";
import { View, StyleSheet, Alert, Modal, Button } from "react-native";
// Third Party Packages
import { useDispatch, useSelector } from "react-redux";
// Additional Modules/Components
import Timer from "./Timer";
import TaskModal from "./TaskModal";
import ControlBar from "./ControlBar";
import MenuButton from "../../shared/components/UI/MenuButton";
import * as timerActions from "../../shared/store/actions/timer";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const TimerScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const timerState = useSelector((state) => state.timer);
    const taskList = useSelector((state) => state.tasks.tasks);
    const currentTask = taskList.length > 0 ? taskList[0].title : "Focus";

    const resetTimerHandler = async () => {
        dispatch(timerActions.reset());
    };

    const stopHandler = async (skipAlert = false) => {
        if (skipAlert) {
            dispatch(timerActions.stop(timerState.isBreak));
            return;
        }

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(timerActions.stop(timerState.isBreak));
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
            (timerState.isBreak
                ? timerState.breakLength
                : timerState.focusLength) -
            timerState.timeElapsed / 1000;
        if (timerState.isRunning) {
            dispatch(timerActions.playPause());
        } else {
            dispatch(timerActions.playPause(currTime + offset * 1000));
        }
    };

    const toggleModalHandler = () => {
        setModalVisible((prev) => !prev);
    };

    return (
        <View style={styles.main}>
            <Timer
                timerLength={
                    timerState.isBreak
                        ? timerState.breakLength
                        : timerState.focusLength
                }
                timerKey={timerState.key}
                resetTimerHandler={resetTimerHandler}
                playPauseHandler={playPauseHandler}
                isRunning={timerState.isRunning}
                color={
                    timerState.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
                title={timerState.isBreak ? "Break" : currentTask}
                onComplete={() => {
                    stopHandler(true);
                }}
            />
            <ControlBar
                playPauseHandler={playPauseHandler}
                stopHandler={() => stopHandler()}
                isRunning={timerState.isRunning}
                color={
                    timerState.isBreak
                        ? ColorsConstant.Success
                        : ColorsConstant.Notice
                }
            />
            <Button title="Modal" onPress={toggleModalHandler} />
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <TaskModal tasks={taskList} modalHandler={toggleModalHandler} />
            </Modal>
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
