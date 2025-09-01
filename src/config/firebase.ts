import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBTvRj5xqoWUavaa5UZZyYgSbRDWzENf0U",
  authDomain: "passportvivolite.firebaseapp.com",
  projectId: "passportvivolite",
  storageBucket: "passportvivolite.firebasestorage.app",
  messagingSenderId: "377863010560",
  appId: "1:377863010560:web:2372d6bb7044acfc9d9be5",
  measurementId: "G-N25R5XQBW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
