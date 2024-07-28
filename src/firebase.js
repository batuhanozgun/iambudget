// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6Gc3fUuugjeOjG3KkdvOMVB5U8Z6HL6k",
  authDomain: "budgetim001.firebaseapp.com",
  projectId: "budgetim001",
  storageBucket: "budgetim001.appspot.com",
  messagingSenderId: "422348614250",
  appId: "1:422348614250:web:8ff1054d974fe44501b813"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};

export { auth, db, logout };
