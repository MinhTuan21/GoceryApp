// // firebaseConfig.js
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDTxIad_jXx3c2o58yR383hlBkrHZsktFI",
//   authDomain: "myapplogin-ee7ee.firebaseapp.com",
//   projectId: "myapplogin-ee7ee",
//   storageBucket: "myapplogin-ee7ee.appspot.com",
//   messagingSenderId: "716127087767",
//   appId: "1:716127087767:android:82587e5ec98c12f4028dd2",
// }

// export const app = initializeApp(firebaseConfig);
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyA1iUQOTkf7-8_TCR9p3QykMyCpgNbvCrE",
  authDomain: "loginfb1-36883.firebaseapp.com",
  projectId: "loginfb1-36883",
  storageBucket: "loginfb1-36883.firebasestorage.app",
  messagingSenderId: "424180852220",
  appId: "1:424180852220:web:c8ea251eb2b6858d00be79",
  measurementId: "G-NKS5827RGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };