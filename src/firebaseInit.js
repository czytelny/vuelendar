import Firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig'
/* eslint-disable no-unused-vars */
import firebaseDatabase from 'firebase/database'

const firebaseApp = Firebase.initializeApp(firebaseConfig)

export default firebaseApp.database()
