import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import ExpoConstants from "expo-constants";
import { firebase } from "../../shared/helpers/firebase";
import * as Google from "expo-auth-session/providers/google";

const StartupScreen = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        expoClientId:
            "435636724308-87pbk73f9v2f1aonejqddm858al3lafj.apps.googleusercontent.com",
        androidClientId: ExpoConstants.manifest.extra.ANDROID_KEY,
    });
    useEffect(() => {
        if (response?.type === "success") {
            const { params } = response;
            // console.log(params.id_token);

            const credential = firebase.auth.GoogleAuthProvider.credential(
                params.id_token
            );

            firebase
                .auth()
                .signInWithCredential(credential)
                .then((response) => {
                    const uid = response.user.uid;
                    const email = response.user.email;
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
                    console.log(error.message);
                });
        }
    }, [response]);

    const signupHandler = () => {
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
        firebase.auth();

        // .signInWithEmailAndPassword(email, password)
        // .then((response) => {
        //     const uid = response.user.uid;
        //     console.log(uid);
        //     const usersRef = firebase.firestore().collection("users");
        //     usersRef
        //         .doc(uid)
        //         .get()
        //         .then((firestoreDoc) => {
        //             if (!firestoreDoc.exists) {
        //                 alert("User does not exist anymore.");
        //                 return;
        //             } else {
        //                 console.log(firestoreDoc.data());
        //             }
        //         });
        // })
        // .catch((error) => {
        //     alert(error);
        // });
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
                <Button
                    title="Login"
                    onPress={() => {
                        promptAsync();
                    }}
                />
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
