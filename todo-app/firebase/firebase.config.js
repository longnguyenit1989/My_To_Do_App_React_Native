import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDntB-Mx3k7uIWtKdaECctqUwAydeFQifg",
  authDomain: "todo-app-react-native-79c9f.firebaseapp.com",
  projectId: "todo-app-react-native-79c9f",
  storageBucket: "todo-app-react-native-79c9f.appspot.com",
  messagingSenderId: "41545724606",
  appId: "1:41545724606:web:b224c2d766bfe0c55c64ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const dbFirebase = getFirestore(app);

export const dbFirebase = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export default dbFirebase;