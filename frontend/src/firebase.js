import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDxX9YDzpJ_H06lflTmN3Cr3-6RAklSVL0",
  authDomain: "slack-clone-ce4b1.firebaseapp.com",
  projectId: "slack-clone-ce4b1",
  storageBucket: "slack-clone-ce4b1.appspot.com",
  messagingSenderId: "379127257735",
  appId: "1:379127257735:web:692c38e7cc89b3b3567622",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
