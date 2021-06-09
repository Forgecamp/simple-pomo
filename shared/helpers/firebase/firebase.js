import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwuoAmUIyknxF1hW0H4ADn5hTfSA4weSg",
    authDomain: "simple-pomo.firebaseapp.com",
    projectId: "simple-pomo",
    storageBucket: "simple-pomo.appspot.com",
    messagingSenderId: "596936347484",
    appId: "1:596936347484:web:b4ec7a693dd872ddcd3b99",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
