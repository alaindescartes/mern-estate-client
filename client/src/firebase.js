// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'realestate-61024.firebaseapp.com',
  projectId: 'realestate-61024',
  storageBucket: 'realestate-61024.appspot.com',
  messagingSenderId: '365535185175',
  appId: '1:365535185175:web:9d4dfddabe9bd6e2250f52',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
