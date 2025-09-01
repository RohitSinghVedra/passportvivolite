import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBVRj5xqoWuavsa5UZZyQs9bRDWzENF6U",
  authDomain: "passportvivolite.firebaseapp.com",
  projectId: "passportvivolite",
  storageBucket: "passportvivolite.appspot.com",
  messagingSenderId: "377863015660",
  appId: "1:377863015660:web:23726dbb7044acfc9d9be5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
