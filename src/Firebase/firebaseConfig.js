// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoUkdRxWiFEGDkHTMvkRrFb-IDxXRfP94",
  authDomain: "aipaago.firebaseapp.com",
  projectId: "aipaago",
  storageBucket: "aipaago.appspot.com",
  messagingSenderId: "699277129675",
  appId: "1:699277129675:web:b60f12132edfcb6c70a84e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imgDb = getStorage(app);
export const auth = getAuth(app);