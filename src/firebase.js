import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBDcmG3mgocGwBreflZq0EoS6eUBxxqIcQ",
  authDomain: "netflixmodified.firebaseapp.com",
  projectId: "netflixmodified",
  storageBucket: "netflixmodified.appspot.com",
  messagingSenderId: "979093338377",
  appId: "1:979093338377:web:092c3cafcf556941ddbbd8",
  measurementId: "G-E8JNH8XBXH"
  };

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
const db = firebaseAdmin.firestore();
const auth = firebase.auth();
const analytics = firebase.analytics();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider, analytics };
