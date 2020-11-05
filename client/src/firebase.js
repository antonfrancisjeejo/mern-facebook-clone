import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDeA-obR4Kq2I4AyHLamzpZ5rio_RzpagE",
  authDomain: "facebook-clone-cb4ea.firebaseapp.com",
  databaseURL: "https://facebook-clone-cb4ea.firebaseio.com",
  projectId: "facebook-clone-cb4ea",
  storageBucket: "facebook-clone-cb4ea.appspot.com",
  messagingSenderId: "907998585028",
  appId: "1:907998585028:web:3f9e380c880da65764e991",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { auth, provider };
export default db;
