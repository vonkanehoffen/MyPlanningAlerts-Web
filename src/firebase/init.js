import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyCR88UO7g_tp1b-5o81LyD_DQUm9IBkdP4",
  authDomain: "my-planning-alerts.firebaseapp.com",
  databaseURL: "https://my-planning-alerts.firebaseio.com",
  projectId: "my-planning-alerts",
  storageBucket: "my-planning-alerts.appspot.com",
  messagingSenderId: "305547772229"
};

// Initialise Firebase itself
firebase.initializeApp(config);

// Init the messaging module.
// See https://firebase.google.com/docs/cloud-messaging/js/client
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BJB7HPyvkpq3BxebJwgD3dEmJK8JGp5ncMfhzIyfmal5_QKTuXh_yNKMZsAJVVHISZqzO9OYnBe4uDsEUnFm30M"
);

// Init Firestore.
const firestore = firebase.firestore();

firestore.enablePersistence().catch(function(err) {
  console.log(err);
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
  // TODO: Show warnings
});

export { messaging, firestore };
