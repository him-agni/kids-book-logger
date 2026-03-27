import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4U32g43dXJCb4nilEf335pdMA7mcGhdQ",
  authDomain: "kids-book-logger.firebaseapp.com",
  projectId: "kids-book-logger",
  storageBucket: "kids-book-logger.firebasestorage.app",
  messagingSenderId: "46529285661",
  appId: "1:46529285661:web:8796f01ba18a97018740f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
