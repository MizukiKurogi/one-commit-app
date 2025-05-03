import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestoreを追加！

const firebaseConfig = {
  apiKey: "AIzaSyB27xo0Y6eY0AISN4VC-lhdZp7UdAE91ao",
  authDomain: "one-commit-app.firebaseapp.com",
  projectId: "one-commit-app",
  storageBucket: "one-commit-app.appspot.com", // 
  messagingSenderId: "507399814200",
  appId: "1:507399814200:web:2d301ff6c6147fdcf5bacd",
  measurementId: "G-GH2XPFF4SP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ← これも必須！
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore初期化！

export { app, auth, db };
