import cloneDeep from 'lodash/cloneDeep'
import stateOptions from '@/store/state'
import gettersOptions from '@/store/getters'

const getters = cloneDeep(gettersOptions)

describe('Getters', () => {
  let state

  beforeEach(() => {
    state = cloneDeep(stateOptions)
  })

  it('orderedNotes: consecutive', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
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

  it('orderedNotes: undefined or null', () => {
    const TEST_KEY_A = 'A'
    const TEST_KEY_B = 'B'
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
      [TEST_KEY_B]: null
    }
    const orderedNotes = getters.orderedNotes(state)
    expect(state.notes[0]['.key']).toBe(orderedNotes[1]['.key'])
  })

  it('markdown returns correct image', () => {
    const HREF = 'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png'
    const TITLE = 'Logo Title Text 1'
    const ALT_TEXT = 'alt text'
    const INPUT = `![${ALT_TEXT}](${HREF} "${TITLE}")`
    const EXPECTED = `<p><img src="${HREF}" alt="${ALT_TEXT}" title="${TITLE}" class="ui image"></p>\n`
    const ACTUAL = getters.markdown(state)(INPUT)
    expect(ACTUAL).toBe(EXPECTED)
  })

  it('markdown returns correct link', () => {
    const HREF = 'https://www.google.com'
    const TITLE = 'Google'
    const TEXT = 'Inline-style link with title'
    const INPUT = `[${TEXT}](${HREF} "${TITLE}")`
    const EXPECTED = `<p><a href="${HREF}" title="${TITLE}" target="_blank">${TEXT}</a></p>\n`
    const ACTUAL = getters.markdown(state)(INPUT)
    expect(ACTUAL).toBe(EXPECTED)
  })
})
