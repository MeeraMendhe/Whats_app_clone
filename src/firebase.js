// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth";
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS697p44llXsASjJr-nV2E5eqoT35EY1k",
  authDomain: "whats-app-clone-24392.firebaseapp.com",
  databaseURL: "https://whats-app-clone-24392-default-rtdb.firebaseio.com",
  projectId: "whats-app-clone-24392",
  storageBucket: "whats-app-clone-24392.appspot.com",
  messagingSenderId: "513264031644",
  appId: "1:513264031644:web:89be82d2de67c8bbf31a59",
  measurementId: "G-QJV1MJ7J3D"
};

  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore()
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider()
  //const rooms = db.collection("rooms")

  // rooms.add({ name: "New name" }).then(res=>{
  //   console.log('adedd',res)
  // }).catch(err=>{
  //   console.log('error',err)
  // })
// console.log(db,auth,provider)
 export {auth,provider}
  export default db
