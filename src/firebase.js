// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKkTWG8TKiNY3yq7YOIzQmp5J5cjerjQ4",
  authDomain: "devsblog-34799.firebaseapp.com",
  projectId: "devsblog-34799",
  storageBucket: "devsblog-34799.appspot.com",
  messagingSenderId: "82878217950",
  appId: "1:82878217950:web:8068b83aa59ec0a3f3cc4f",
  measurementId: "G-PNCE567Y7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)