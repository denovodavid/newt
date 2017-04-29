import * as types from './mutation-types'
import firebase from 'firebase'
import { firebaseAction } from 'vuexfire'
import { firebaseApp, db } from '../firebase'
import debounce from 'lodash/debounce'

export const setNotesRef = firebaseAction(({ bindFirebaseRef, dispatch, commit }, { ref }) => {
  dispatch('asyncLoading', true)
  bindFirebaseRef('notes', ref, {
    readyCallback () {
      dispatch('asyncLoading', false)
    }
  })
})

export const setNotesOrderRef = firebaseAction(({ bindFirebaseRef, dispatch, commit }, { ref }) => {
  dispatch('asyncLoading', true)
  bindFirebaseRef('notesOrder', ref, {
    readyCallback () {
      dispatch('asyncLoading', false)
    }
  })
})

export const signInWithEmailAndPassword = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        reject(error)
      })
  })
}

export const asyncLoading = debounce(({ commit }, isLoading) => {
  // console.log(isLoading ? 'Loading...' : 'Done.')
  commit(types.ASYNC_LOADING, isLoading)
}, 500)

export const createNote = ({ dispatch, commit }, note) => {
  dispatch('asyncLoading', true)
  db.ref('notes').push({
    title: note.title.trim(),
    text: note.text.trim(),
    markdown: note.markdown,
    color: note.color,
    created_at: firebase.database.ServerValue.TIMESTAMP
  }, () => {
    console.log('Note Created!')
    dispatch('asyncLoading', false)
    commit(types.CLEAR_NOTE_FORM)
    // reset newNote using some mutation
  })
}

export const updateNote = ({ dispatch, commit }, note) => {
  dispatch('asyncLoading', true)
  db.ref('notes').child(note['.key']).update({
    title: note.title.trim(),
    text: note.text.trim(),
    markdown: note.markdown,
    color: note.color
  }, () => {
    dispatch('asyncLoading', false)
    console.log('Note Updated!')
  })
}

export const removeNote = ({ dispatch, commit }, note) => {
  dispatch('asyncLoading', true)
  db.ref('notes').child(note['.key']).remove()
    .then(() => {
      dispatch('asyncLoading', false)
      console.log('Note Removed!')
    })
    .catch((error) => {
      dispatch('asyncLoading', false)
      console.error('Note Remove Failed', error.message)
    })
}

export const updateNoteColor = ({ dispatch, commit }, note) => {
  dispatch('asyncLoading', true)
  db.ref('notes').child(note['.key']).update({
    color: note.color
  }, () => {
    dispatch('asyncLoading', false)
    console.log('Note Color Updated!')
  })
}

export const updateNotesOrder = ({ dispatch, commit }, order) => {
  dispatch('asyncLoading', true)
  db.ref('notesOrder').update(order, () => {
    dispatch('asyncLoading', false)
    console.log('update order success')
  })
}
