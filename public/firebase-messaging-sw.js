importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAGOkZVsf7XZsdL6l3wx9j7S0IhiSr9pGc",
  authDomain: "todoapp-redux-4df90.firebaseapp.com",
  projectId: "todoapp-redux-4df90",
  storageBucket: "todoapp-redux-4df90.appspot.com",
  messagingSenderId: "50126152773",
  appId: "1:50126152773:web:2b9d118f75032684a2ef2c",
  measurementId: "G-GZ7PMBQ4S8",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "new notification";
  const notificationOptions = {
    body: "new todo added",
    icon: "./logo192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
