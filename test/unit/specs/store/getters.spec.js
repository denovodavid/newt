import * as getters from '@/store/getters'

describe('Getters', () => {
  it('orderedNotes: consecutive', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 2,
      [TEST_KEY_B]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(TEST_KEY_A)
    expect(orderedNotes[0]['.key']).toBe(TEST_KEY_B)
  })

  it('orderedNotes: equal', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 1,
      [TEST_KEY_B]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(orderedNotes[0]['.key'])
  })

  // TODO: Fix this test, it wrong :(
  xit('orderedNotes: undefined or null', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
    const TEST_KEY_C = 'C'
    const state = {}
    state.notes = [
      {
        '.key': TEST_KEY_A,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_B,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      },
      {
        '.key': TEST_KEY_C,
        checked: false,
        color: '',
        created_at: '',
        markdown: false,
        text: '',
        title: ''
      }
    ]
    state.notesOrder = {
      [TEST_KEY_A]: 0,
      [TEST_KEY_B]: null,
      [TEST_KEY_C]: 1
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(orderedNotes[0]['.key'])
    console.dir(state)
  })
})
