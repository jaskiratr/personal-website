import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.NUXT_FIREBASE_CONFIG)
}
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase
