import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCxLGmhSPj8MZ-K-JVMae_90_rz7s-3S4M",
    authDomain: "karbon-413610.firebaseapp.com",
    projectId: "karbon-413610",
    storageBucket: "karbon-413610.appspot.com",
    messagingSenderId: "658020520807",
    appId: "1:658020520807:web:d8d3eb704207f5033455c2",
    measurementId: "G-CJHLL5X62C"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;