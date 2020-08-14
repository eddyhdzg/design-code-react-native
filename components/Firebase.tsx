import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJCifVur2jwnc-eA-J5RHE5387KQNXUno",
  authDomain: "react-native-4-designers.firebaseapp.com",
  databaseURL: "https://react-native-4-designers.firebaseio.com",
  storageBucket: "react-native-4-designers.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
