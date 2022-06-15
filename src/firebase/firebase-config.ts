import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXGVUFnMkersFN1GPNrESnyzZqQLjSTcQ",
  authDomain: "app-ecg-c4f86.firebaseapp.com",
  projectId: "app-ecg-c4f86",
  storageBucket: "app-ecg-c4f86.appspot.com",
  messagingSenderId: "998969362296",
  appId: "1:998969362296:web:1f74d8b76487a8caa9aa8d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
