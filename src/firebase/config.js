
import { initializeApp } from 'firebase/app';
import { Timestamp, getFirestore } from 'firebase/firestore/lite';  
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBfR89UoHZk7jVEfpK4wPTX9nU0MGvb6Oc",
  authDomain: "expensify-94480.firebaseapp.com",
  projectId: "expensify-94480",
  storageBucket: "expensify-94480.appspot.com",
  messagingSenderId: "63490883163",
  appId: "1:63490883163:web:dea752a081dbf3b6c2897e",
  measurementId: "G-0B1KYNDVD0"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

//init service
const projectFirestore= getFirestore(app)
const projectAuth=getAuth()

//timestamp
// const timestamp=firebase.firestore.Timestamp 



export {projectFirestore,projectAuth,Timestamp}