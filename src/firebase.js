// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAXZNzZ9c3UMkmU6s8xucVGt7JjwUB7MpA",
  authDomain: "blog-app-561c8.firebaseapp.com",
  projectId: "blog-app-561c8",
  storageBucket: "blog-app-561c8.appspot.com",
  messagingSenderId: "697691826380",
  appId: "1:697691826380:web:22990525360b22e6ff7a69",
  measurementId: "G-P3KY7S1KFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getDatabase(app)
export const provider = new GoogleAuthProvider();
export const dbRef = (path) => {
  return ref(db, path)
}
