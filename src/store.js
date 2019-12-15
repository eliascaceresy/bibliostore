import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/firestore";

// Config firestore
const firebaseConfig = {
  apiKey: "AIzaSyAYihWevIJEGz7AwA4iL5GJoQjinmRKOo0",
  authDomain: "bibliosotre.firebaseapp.com",
  databaseURL: "https://bibliosotre.firebaseio.com",
  projectId: "bibliosotre",
  storageBucket: "bibliosotre.appspot.com",
  messagingSenderId: "709834243489",
  appId: "1:709834243489:web:e47916ea676adf153c1fe0",
  measurementId: "G-NZT90R6W3Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Config react-redux
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// initial state
const initialState = {};

// Create el store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
