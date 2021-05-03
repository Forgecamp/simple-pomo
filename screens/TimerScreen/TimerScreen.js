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
import * as timerActions from "../../shared/store/actions/timer";
// Constants
import ExpoConstants from "expo-constants";
import * as ColorsConstant from "../../shared/constants/Colors";

const TimerScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const timerState = useSelector((state) => state.timer);

    const resetTimerHandler = async () => {
        dispatch(timerActions.reset());
    };

    const stopHandler = async (skipAlert = false) => {
        if (skipAlert) {
            dispatch(timerActions.stop());
            return;
        }

        Alert.alert(
            "Stop Timer",
            "Stop the timer and complete the current period?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(timerActions.stop());
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
                title={timerState.isBreak ? "Break" : "Focus"}
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Button
                        title="Modal"
                        onPress={() => {
                            setModalVisible((prev) => !prev);
                        }}
                    />
                    <TaskList />
                </View>
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
