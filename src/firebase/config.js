// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore} from 'firebase/firestore';

import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbBwyV8z8T6uMKWLIzS7wQkdx_W-1T-Hg",
  authDomain: "twitt-cf886.firebaseapp.com",
  projectId: "twitt-cf886",
  storageBucket: "twitt-cf886.appspot.com",
  messagingSenderId: "108216675365",
  appId: "1:108216675365:web:d7893fe787a1486d53e3cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirme kurulumu
export const auth = getAuth(app);

// google sağlayıcı kurulumu
export const googleProvider = new GoogleAuthProvider();

// veritabanı kurulum
export const db = getFirestore(app);

// medya depolama alamnı
export const storage = getStorage(app);