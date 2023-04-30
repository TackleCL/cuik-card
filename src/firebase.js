import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCybkYsl2jRDpvsPI6pwCNeROGYVWsesjA",
  authDomain: "my-cuik.firebaseapp.com",
  projectId: "my-cuik",
  storageBucket: "my-cuik.appspot.com",
  messagingSenderId: "1045270486398",
  appId: "1:1045270486398:web:a7e257d6beb76b3c42e72f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions();

if (process.env.NODE_ENV === "development_") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8082);
  connectStorageEmulator(storage, "localhost", 9199);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { auth, db, storage, functions };
