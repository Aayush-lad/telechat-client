import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUoe5L5F7JdcLx8mEz4vdUdM7cUGOWbiI",
  authDomain: "chatapplication-cd134.firebaseapp.com",
  projectId: "chatapplication-cd134",
  storageBucket: "chatapplication-cd134.appspot.com",
  messagingSenderId: "172125237134",
  appId: "1:172125237134:web:3b97110a8d3dc099b57edf",
  measurementId: "G-31MT4CTMV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  firebaseAuth = getAuth(app)
