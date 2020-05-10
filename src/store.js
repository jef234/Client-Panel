import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAS_Y1ffT4ObeMy6c74dvBEPTETU3qyNRs",
    authDomain: "react-client-panel-9832d.firebaseapp.com",
    databaseURL: "https://react-client-panel-9832d.firebaseio.com",
    projectId: "react-client-panel-9832d",
    storageBucket: "react-client-panel-9832d.appspot.com",
    messagingSenderId: "1822124726",
    appId: "1:1822124726:web:2755c7db05d7b9da8c5417"
}

//react-redux-firebase configuration
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig)
//Init firestore
const firestore = firebase.firestore()

//Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reduxFirestore(firebase, rrfConfig)
)(createStore)

const rootReducer = combineReducers({
    firestore: firestoreReducer
})

//Create intial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState
)

export default store