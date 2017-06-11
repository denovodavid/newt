import * as actions from '@/store/actions'

jest.mock('vuexfire')
jest.mock('@/firebaseApp')
jest.mock('lodash/debounce', () => {
  return (fn) => {
    return fn
  }
})

// helper for testing action with expected mutations and actions
const testAction = (action, payload, state, expectedMutations, expectedActions, done) => {
  // mock commit and dispatch
  const commit = jest.fn(done)
  const dispatch = jest.fn(done)

  // call the action with mocked store and arguments
  action({ dispatch, commit, state }, payload)

  // expect mutations and actions to be called with arguments
  expectedMutations.forEach(({ type, payload }) => {
    if (payload != null) {
      expect(commit).toBeCalledWith(type, payload)
    } else {
      expect(commit).toBeCalledWith(type)
    }
  })
  expectedActions.forEach(({ type, payload }) => {
    if (payload != null) {
      expect(dispatch).toBeCalledWith(type, payload)
    } else {
      expect(dispatch).toBeCalledWith(type)
    }
  })

  expect(commit.mock.calls.length).toBe(expectedMutations.length)
  expect(dispatch.mock.calls.length).toBe(expectedActions.length)

  // if no mutations or actions should have been dispatched, end
  if (expectedMutations.length === 0 && expectedActions.length === 0) {
    done()
  }
}

describe('actions', () => {
  it('setNotesRef', done => {
    testAction(actions.setNotesRef, 'fakeRef', {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })

  it('setNotesOrderRef', done => {
    testAction(actions.setNotesOrderRef, 'fakeRef', {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })

  it('signInWithEmailAndPassword', done => {
    testAction(actions.signInWithEmailAndPassword, {}, {}, [], [], done)
  })

  it('asyncLoading', done => {
    const payload = true
    testAction(actions.asyncLoading, payload, {}, [{
      type: 'ASYNC_LOADING',
      payload
    }], [], done)
  })

  it('createNote', done => {
    testAction(actions.createNote, {
      title: 'title',
      text: 'text',
      markdown: false,
      color: 'white'
    }, {}, [{ type: 'CLEAR_NOTE_FORM' }], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })

  it('updateNote', done => {
    testAction(actions.updateNote, {
      title: 'title',
      text: 'text',
      markdown: false,
      color: 'white'
    }, {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })

  it('removeNote', done => {
    testAction(actions.removeNote, {}, {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
    done()
  })

  it('updateNoteColor', done => {
    testAction(actions.updateNoteColor, {
      title: 'title',
      text: 'text',
      markdown: false,
      color: 'white'
    }, {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })

  it('updateNotesOrder', done => {
    testAction(actions.updateNotesOrder, {}, {}, [], [{
      type: 'asyncLoading',
      payload: true
    }, {
      type: 'asyncLoading',
      payload: false
    }], done)
  })
})
