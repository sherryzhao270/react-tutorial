import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAJPuHPk8DG59Q8Qt4x8z2aHObA137cxU",
  authDomain: "react-tutorial-21dfb.firebaseapp.com",
  projectId: "react-tutorial-21dfb",
  storageBucket: "react-tutorial-21dfb.appspot.com",
  messagingSenderId: "396459276426",
  appId: "1:396459276426:web:40ab77c7839585ac5a1573",
  measurementId: "G-XZV10L5Z2G"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
      setData(snapshot.val());
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};


if (process.env.REACT_APP_EMULATE) {

  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "61rG49a7hiToL8mAhnnp5bk0ksQ8", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true, "password":"123456"}'
  ));
}
