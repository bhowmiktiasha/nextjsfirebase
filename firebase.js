import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDWFsR-_LJr_GjyU-RnAsPO_sCl1BBGhl4",
  authDomain: "nextjsblog-1a408.firebaseapp.com",
  projectId: "nextjsblog-1a408",
  storageBucket: "nextjsblog-1a408.appspot.com",
  messagingSenderId: "193527225865",
  appId: "1:193527225865:web:b1adb13a359728babf62d8"
};


if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}


