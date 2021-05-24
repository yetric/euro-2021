import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const useLocalEmulators = process.env
    .REACT_APP_FIREBASE_USE_LOCALHOST_EMULATORS
    ? process.env.REACT_APP_FIREBASE_USE_LOCALHOST_EMULATORS
    : false;

if (useLocalEmulators !== 'false') {
  firebase.firestore().useEmulator('localhost', 8080);
  firebase.auth().useEmulator('http://localhost:5001/');
  firebase.functions().useEmulator('localhost', 5002);
}

export {firebase};
