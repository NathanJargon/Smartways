import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { setLogLevel, LogLevel } from '@firebase/logger';

const firebaseConfig = {
  apiKey: "AIzaSyBhKk4d1nqCmAvlA6AVOiny4U_rit74XnE",
  authDomain: "smartways-583d4.firebaseapp.com",
  databaseURL: "https://smartways-583d4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartways-583d4",
  storageBucket: "smartways-583d4.appspot.com",
  messagingSenderId: "277141185652",
  appId: "1:277141185652:web:f5589d20f2486e2b351d21",
  measurementId: "G-MVCF8DR09B"
};


setLogLevel(LogLevel.ERROR);
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const storage = getStorage(firebaseApp);

export { auth, db, collection, storage, firebaseApp };