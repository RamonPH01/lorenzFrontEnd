import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5qwg1USEcA5G5-1g7BjGAuQCU2HIED34",
    authDomain: "veranstalterlogin.firebaseapp.com",
    projectId: "veranstalterlogin",
    storageBucket: "veranstalterlogin.firebasestorage.app",
    messagingSenderId: "930448388874",
    appId: "1:930448388874:web:0bec7b7801e6221042c0f3",
    measurementId: "G-PY1KGCQ0VC"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount("#app");

