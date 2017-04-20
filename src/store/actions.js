import * as types from './mutation-types'
import firebase from 'firebase'
import { firebaseAction } from 'vuexfire'
import { firebaseApp, db } from '../firebase'

export const setNotesRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('notes', ref)
})

export const setNotesOrderRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('notesOrder', ref)
})

export const signInWithEmailAndPassword = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        reject(error)
      })
  })
}

export const createNote = ({ commit }, note) => {
  db.ref('notes').push({
    title: note.title.trim(),
    text: note.text.trim(),
    markdown: note.markdown,
    color: note.color,
    created_at: firebase.database.ServerValue.TIMESTAMP
  }, () => {
    console.log('Note Created!')
    commit(types.CLEAR_NOTE_FORM)
    // reset newNote using some mutation
  })
}

export const updateNote = ({ commit }, note) => {
  db.ref('notes').child(note['.key']).update({
    title: note.title.trim(),
    text: note.text.trim(),
    markdown: note.markdown,
    color: note.color
  }, () => {
    console.log('Note Updated!')
  })
}

export const removeNote = ({ commit }, note) => {
  db.ref('notes').child(note['.key']).remove()
    .then(() => {
      console.log('Note Removed!')
    })
    .catch((error) => {
      console.error('Note Remove Failed', error.message)
    })
}

export const updateNoteColor = ({ commit }, note) => {
  db.ref('notes').child(note['.key']).update({
    color: note.color
  }, () => {
    console.log('Note Color Updated!')
  })
}

export const updateNotesOrder = ({ commit }, order) => {
  db.ref('notesOrder').update(order, () => {
    console.log('update order success')
  })
}
