
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB0HjLaW19LYZfEbZSwBzsld5qOZ3XcFxI",
    authDomain: "expensify-a174e.firebaseapp.com",
    projectId: "expensify-a174e",
    storageBucket: "expensify-a174e.appspot.com",
    messagingSenderId: "695687003734",
    appId: "1:695687003734:web:ab5b1a14e47da1a0fb05f7",
    measurementId: "G-RBY50763PN"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

//init service
const projectFirestore= getFirestore(app)
const projectAuth=getAuth()

export {projectFirestore,projectAuth}