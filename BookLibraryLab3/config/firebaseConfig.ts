 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBLQf6W1yC84cGuVohhyJSaHB7iClRp4mE",
   authDomain: "booklibrary-lab3.firebaseapp.com",
   projectId: "booklibrary-lab3",
   storageBucket: "booklibrary-lab3.firebasestorage.app",
   messagingSenderId: "599696527823",
   appId: "1:599696527823:web:6e8b392f6da8cdaa4182ba"
 };
 
 // Initialize Firebase
 const FIREBASE_APP = initializeApp(firebaseConfig);
 const FIREBASE_DB = getFirestore(FIREBASE_APP);

 export { FIREBASE_DB, collection, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc};