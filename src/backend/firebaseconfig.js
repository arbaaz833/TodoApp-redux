import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAGOkZVsf7XZsdL6l3wx9j7S0IhiSr9pGc",
  authDomain: "todoapp-redux-4df90.firebaseapp.com",
  projectId: "todoapp-redux-4df90",
  storageBucket: "todoapp-redux-4df90.appspot.com",
  messagingSenderId: "50126152773",
  appId: "1:50126152773:web:2b9d118f75032684a2ef2c",
  measurementId: "G-GZ7PMBQ4S8",
});

export const db = app.firestore();
export const auth = app.auth();
export const messaging = app.messaging();
