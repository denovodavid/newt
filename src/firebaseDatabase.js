import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBFN89t2lehIxUBmZ3tbf3izP5uDpoUn3A",
  authDomain: "newt-853a9.firebaseapp.com",
  databaseURL: "https://newt-853a9.firebaseio.com",
  storageBucket: "newt-853a9.appspot.com"
}
const firebaseApp = Firebase.initializeApp(firebaseConfig)
const db = firebaseApp.database()

export { db as default }
