// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdpicDg9hszidaUU-rcoydSn4qcAss8fQ",
  authDomain: "handmade-16f98.firebaseapp.com",
  projectId: "handmade-16f98",
  storageBucket: "handmade-16f98.appspot.com",
  messagingSenderId: "379733696757",
  appId: "1:379733696757:web:e7dc9e2ac78ce25a8565bc",
  measurementId: "G-YP9HRF9VNQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };