// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTWrtQZK2AhA7ImPXvE_g7buAVS3FrF7M",
    authDomain: "halal-harvest.firebaseapp.com",
    databaseURL: "https://halal-harvest-default-rtdb.firebaseio.com",
    projectId: "halal-harvest",
    storageBucket: "halal-harvest.appspot.com",
    messagingSenderId: "570376577061",
    appId: "1:570376577061:web:5626b7e88e465a4cac1fcc",
    measurementId: "G-W52QXRM1ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export { auth }
