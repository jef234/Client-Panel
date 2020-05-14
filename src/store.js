import { createStore, combineReducers} from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer, createFirestoreInstance } from 'redux-firestore'

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
firebase.firestore()

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

//Create intial state
const initialState = {};

export let store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export let rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }