import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import ExpoConstants from "expo-constants";
import { firebase } from "../../shared/helpers/firebase";

const StartupScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const signupHandler = () => {
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         const user = userCredential.user;
        //         console.log(user);
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //     });
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                const data = {
                    id: uid,
                    email,
                    test: "test",
                };
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .set(data)
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    };

    const loginHandler = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid;
                console.log(uid);
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .get()
                    .then((firestoreDoc) => {
                        if (!firestoreDoc.exists) {
                            alert("User does not exist anymore.");
                            return;
                        } else {
                            console.log(firestoreDoc.data());
                        }
                    });
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.loadingScreen}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(() => text);
                    }}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(() => text);
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={signupHandler} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={loginHandler} />
            </View>
        </View>
    );
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
    input: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        width: 300,
        marginBottom: 10,
    },
    buttonContainer: {
        width: 300,
        margin: 5,
    },
    inputContainer: {
        alignItems: "flex-start",
    },
    label: {
        paddingBottom: 3,
    },
});

export default StartupScreen;
