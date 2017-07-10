import Firebase from 'firebase/app'
import firebaseConfig from './firebaseConfig'
/* eslint-disable no-unused-vars */
import firebaseDatabase from 'firebase/database'
import firebaseAuth from 'firebase/auth'

const firebaseApp = Firebase.initializeApp(firebaseConfig)

export default firebaseApp
