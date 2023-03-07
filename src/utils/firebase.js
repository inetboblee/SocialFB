  // Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbTH7dV0PDa7bgldqLeo3KFC7TLHEaE0Q",
  authDomain: "socialfb-3ec32.firebaseapp.com",
  projectId: "socialfb-3ec32",
  storageBucket: "socialfb-3ec32.appspot.com",
  messagingSenderId: "119100639712",
  appId: "1:119100639712:web:eea042d2aeddd19e440385"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);





  export default firebase;