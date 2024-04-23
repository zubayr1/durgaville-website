import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBZw3G6MjT-fRACtWve8nScFWYoi1fKhtI',
  authDomain: 'durgaville-official.firebaseapp.com',
  projectId: 'durgaville-official',
  storageBucket: 'durgaville-official.appspot.com',
  messagingSenderId: '893575835025',
  appId: '1:893575835025:web:8d2d5a42d268eb34c4be30',
  measurementId: 'G-FNBE52HTDC',
}

// Initialize Firebase

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, auth, storage }
