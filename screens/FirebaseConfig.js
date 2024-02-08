import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCxLGmhSPj8MZ-K-JVMae_90_rz7s-3S4M",
    authDomain: "karbon-413610.firebaseapp.com",
    projectId: "karbon-413610",
    storageBucket: "karbon-413610.appspot.com",
    messagingSenderId: "658020520807",
    appId: "1:658020520807:web:d8d3eb704207f5033455c2",
    measurementId: "G-CJHLL5X62C"
  };

const firebaseApp = initializeApp(firebaseConfig);

// Add AsyncStorage for auth state persistence
const auth = initializeAuth(firebaseApp, {
persistence: getReactNativePersistence(AsyncStorage),
});

export { firebaseApp, auth };