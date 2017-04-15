// import * as api from '../api'
import * as types from './mutation-types'
import firebase from 'firebase'
import { firebaseAction } from 'vuexfire'
import db from '../database'

export const setNotesRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('notes', ref)
})

export const setNotesOrderRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('notesOrder', ref)
})

export const createNote = ({ commit }, payload) => {
  db.ref('notes').push({
    title: payload.title.trim(),
    text: payload.text.trim(),
    markdown: payload.markdown,
    color: payload.color,
    created_at: firebase.database.ServerValue.TIMESTAMP
  }, () => {
    console.log('Note Created!')
    commit(types.CLEAR_NOTE_FORM)
    // reset newNote using some mutation
  })
}

// export const getAllMessages = ({ commit }) => {
//   api.getAllMessages(messages => {
//     commit(types.RECEIVE_ALL, {
//       messages
//     })
//   })
// }

// export const sendMessage = ({ commit }, payload) => {
//   api.createMessage(payload, message => {
//     commit(types.RECEIVE_MESSAGE, {
//       message
//     })
//   })
// }

// export const switchThread = ({ commit }, payload) => {
//   commit(types.SWITCH_THREAD, payload)
// }
