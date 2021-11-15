import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAcQSustU101C9cL4GowpmOIPwZFVHT0lk",
    authDomain: "to-do-b3d7d.firebaseapp.com",
    databaseURL:
        "https://to-do-b3d7d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "to-do-b3d7d",
    storageBucket: "to-do-b3d7d.appspot.com",
    messagingSenderId: "11241763589",
    appId: "1:11241763589:web:4216a93807cdf89fdf7d6c",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();

export default database;
