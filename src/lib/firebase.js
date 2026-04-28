import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, updateDoc, query, where, getDocs, orderBy, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7S7HHdAYrJwet_E3h2iW5HO574mBcZ-M",
  authDomain: "fixo-builder.firebaseapp.com",
  databaseURL: "https://fixo-builder-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fixo-builder",
  storageBucket: "fixo-builder.firebasestorage.app",
  messagingSenderId: "330402290645",
  appId: "1:330402290645:web:083b36e84eb64847e47b5c",
  measurementId: "G-9EXD6MKK8V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, addDoc, updateDoc, query, where, getDocs, orderBy, serverTimestamp };
